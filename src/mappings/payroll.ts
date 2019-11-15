import { Salary, Stream } from "../types/schema";
import { CreateSalary as CreateSalaryEvent } from "../types/Payroll/Payroll";

export function handleCreateSalary(event: CreateSalaryEvent): void {
  let stream = Stream.load(event.params.streamId.toString());
  if (stream == null) {
    return;
  }

  let salary = new Salary(event.params.salaryId.toString());
  salary.company = event.params.company;
  salary.employee = stream.recipient;
  salary.stream = event.params.streamId.toString();
  salary.save();
}
