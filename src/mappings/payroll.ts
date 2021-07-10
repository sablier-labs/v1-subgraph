import { Address, dataSource } from "@graphprotocol/graph-ts";

import { CUTOFF_STREAM_ID } from "../helpers/constants";
import { createStreamTransaction, loadOrCreateToken } from "../helpers/database";
import { CreateSalary as CreateSalaryEvent, Payroll as PayrollContract } from "../types/Payroll/Payroll";
import { Sablier as SablierContract, Sablier__getStreamResult } from "../types/SablierV1.1.0/Sablier";
import { Stream } from "../types/schema";

/// Maps and normalises salaries as streams. The "payroll" naming might sound awkward, but this is due
/// to historical reasons. We initially thought of Sablier as having a narrow scope. But after writing
/// the contracts, we realised that the same code can be used for far more use cases.
export function handleCreateSalary(event: CreateSalaryEvent): void {
  if (event.params.salaryId.ge(CUTOFF_STREAM_ID)) {
    return;
  }

  // Get hold of the Payroll.sol and Sablier.sol contract instances.
  let payrollAddress: Address = dataSource.address();
  let payrollContract: PayrollContract = PayrollContract.bind(payrollAddress);
  let sablierAddress = payrollContract.sablier();
  let sablierContract: SablierContract = SablierContract.bind(sablierAddress);

  // Query the Sablier.sol for the newly created stream.
  let getStreamResult: Sablier__getStreamResult = sablierContract.getStream(event.params.streamId);
  let tokenAddress: string = getStreamResult.value3.toHex();

  // Create the stream entity.
  let streamId: string = event.params.salaryId.toString();
  let stream: Stream = new Stream(streamId);
  stream.sender = event.params.company;
  stream.recipient = getStreamResult.value1;
  stream.deposit = getStreamResult.value2;
  stream.token = tokenAddress;
  stream.startTime = getStreamResult.value4;
  stream.stopTime = getStreamResult.value5;
  stream.ratePerSecond = getStreamResult.value7;
  stream.timestamp = event.block.timestamp;
  stream.save();

  // Create adjacent but important entities.
  createStreamTransaction("CreateStream", event, streamId);
  loadOrCreateToken(tokenAddress);
}
