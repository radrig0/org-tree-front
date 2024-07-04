import { IUser } from "./models";
import { faker } from "@faker-js/faker";

faker.seed(42)

export const createUsers = (count: number): IUser[] => {
  const users: IUser[] = [];
  for (let i = 0; i < count; i++) {
    users.push(createUser(i, faker.helpers.rangeToNumber({min: 0, max: count})));
  }
  return users;
}

const createUser = (id: number, parentId: number | null): IUser => {
  return {
    id,
    parentId,
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName()
  }
}