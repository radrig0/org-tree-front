'use client';

import { FC, useContext, useEffect } from 'react';
import { EmployeeCard } from './EmployeeCard/EmployeeCard';
import { TreeRenderer } from './TreeRenderer/TreeRenderer';
import styles from './orgTree.module.css';
import { AddEmployeeForm } from './AddEmployeeForm/AddEmployeeForm';
import { getList } from '@/actions/employeesActions';
import { EmployeesContext } from '@/providers/EmployeesProvider';

export const OrgTree: FC = () => {
  const { employees, setEmployees } = useContext(EmployeesContext);

  useEffect(() => {
    const loadEmployees = async () => {
      const fetchedList = await getList();
      setEmployees(fetchedList);
    };
    loadEmployees();
  }, [setEmployees]);

  return (
    <div className={styles.wrapper}>
      <AddEmployeeForm />
      <div className={styles.title}>Org tree</div>
      <TreeRenderer nodes={employees} renderComponent={EmployeeCard} />
    </div>
  );
};