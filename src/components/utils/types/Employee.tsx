import { EmployeeRoles } from "./EmployeeRoles";

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  employeeRoles: EmployeeRoles[];
};
