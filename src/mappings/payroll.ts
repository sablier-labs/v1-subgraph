import { Salary } from "../types/schema";
import { CreateSalary as CreateSalaryEvent } from "../types/Payroll/Payroll";

export function handleCreateSalary(event: CreateSalaryEvent): void {
  let salaryId = event.params.salaryId.toString();
  let salary = new Salary(salaryId);
  salary.company = event.params.company;
  salary.stream = event.params.streamId.toString();
  salary.save();
}
