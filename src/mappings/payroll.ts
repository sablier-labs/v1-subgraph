import { ProxyStream, Stream } from "../types/schema";
import { CreateSalary as CreateSalaryEvent } from "../types/Payroll/Payroll";

/**
 * Maps the salary creation event to an object called "proxyStream". You may notice a naming
 * discrepancy, but this is on purpose. Initially, we thought that the proxy would only be
 * useful to the payroll dapp, only to later realise that a proxy that can be used to run a
 * relayer system would be pretty damn useful.
 */
export function handleCreateSalary(event: CreateSalaryEvent): void {
  let stream = Stream.load(event.params.streamId.toString());
  if (stream == null) {
    return;
  }

  let proxyStream = new ProxyStream(event.params.salaryId.toString());
  proxyStream.sender = event.params.company;
  proxyStream.recipient = stream.recipient;
  proxyStream.stream = event.params.streamId.toString();
  proxyStream.timestamp = event.block.timestamp;
  proxyStream.save();
}
