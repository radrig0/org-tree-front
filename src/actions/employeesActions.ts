'use server';

import { IEmployee } from '@/app/_orgTree/models';

const SERVER = 'http://localhost:3000';
const employeesPath = '/employees';

export async function create(employee: Omit<IEmployee, 'id'>): Promise<IEmployee | null> {
  const response = await fetch(
    `${SERVER}/employees`,
    {
      method: 'POST',
      body: JSON.stringify(employee),
      headers: { 'Content-Type': 'application/json' },
    },
  );
  if (response.ok) {
    return response.json();
  } else {
    console.log('response create error: ', response);
    return null;
  }
}

export async function getList(): Promise<IEmployee[]> {
  const response = await fetch(`${SERVER}${employeesPath}`, { method: 'GET', cache: 'force-cache' });
  if (response.ok) {
    return response.json();
  } else {
    console.log('response list error: ', response);
    return [];
  }
}

export async function updateParentId(id: number, parentId: number | null): Promise<IEmployee | null> {
  const response = await fetch(
    `${SERVER}${employeesPath}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ parentId }),
      headers: { 'Content-Type': 'application/json' },
    },
  );
  if (response.ok) {
    return response.json();
  } else {
    console.log('response update parent id error: ', response);
    return null;
  }
}

export async function deleteById(id: number): Promise<void> {
  const response = await fetch(
    `${SERVER}${employeesPath}/${id}`,
    { method: 'DELETE' },
  );
  if (response.ok) {
    return;
  } else {
    console.log('response delete parent id error: ', response);
  }
}