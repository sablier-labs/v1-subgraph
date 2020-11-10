import { CreateSalary as CreateSalaryEvent } from "../types/Payroll/Payroll";
import { ProxyStream, Stream } from "../types/schema";

/**
 * Maps the salary creation event to an entity called "ProxyStream". The naming might sound
 * awkward, but this is on purpose. We initially thought of Sablier as having a narrow
 * scope (payroll) but only after authoring the contracts, we realised that the
 * same implementation can be used for more use cases.
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
