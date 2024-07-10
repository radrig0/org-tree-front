import { IEmployee } from "./models";
import { faker } from "@faker-js/faker";

faker.seed(42)

export const createEmployees = (count: number): IEmployee[] => {
  const employees: IEmployee[] = [];
  for (let i = 0; i < count; i++) {
    const parent = faker.helpers.arrayElement([...employees, null])
    employees.push(createEmployee(i, parent?.id || null));
  }
  return employees;
}

const createEmployee = (id: number, parentId: number | null): IEmployee => {
  return {
    id,
    parentId,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName()
  }
}