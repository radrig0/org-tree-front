'use server';

import { IEmployee } from '@/app/_orgTree/models';
import axios from 'axios';

const SERVER = 'https://org-tree-back.vercel.app/';
const employeesPath = '/employees';

export async function create(employee: Omit<IEmployee, 'id'>): Promise<IEmployee | null> {
  try {
    const response = await axios.post(`${SERVER}${employeesPath}`, employee, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.log('response create error: ', error);
    return null;
  }
}

export async function getList(): Promise<IEmployee[]> {
  try {
    const response = await axios.get(`${SERVER}${employeesPath}`, {
      headers: { 'Cache-Control': 'force-cache' },
    });
    return response.data;
  } catch (error) {
    console.log('response list error: ', error);
    return [];
  }
}

export async function updateParentId(id: number, parentId: number | null): Promise<IEmployee | null> {
  try {
    const response = await axios.patch(`${SERVER}${employeesPath}/${id}`, { parentId }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.log('response update parent id error: ', error);
    return null;
  }
}

export async function deleteById(id: number): Promise<void> {
  try {
    await axios.delete(`${SERVER}${employeesPath}/${id}`);
  } catch (error) {
    console.log('response delete parent id error: ', error);
  }
}