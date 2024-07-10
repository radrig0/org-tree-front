'use client';

import { FC, useContext, useEffect } from 'react';
import { EmployeeCard } from './EmployeeCard/EmployeeCard';
import styles from './orgTree.module.css';
import { AddEmployeeForm } from './AddEmployeeForm/AddEmployeeForm';
import { EmployeesContext } from '@/providers/EmployeesProvider';
import { TreeRenderer } from '@/components/treeRenderer/TreeRenderer';

export const OrgTree: FC = () => {
  const { employees, loadEmployees, isPending } = useContext(EmployeesContext);

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className={styles.wrapper}>
      <AddEmployeeForm />
      <div className={styles.title}>Org tree</div>
      {isPending && <div className={styles.loader}>Loading...</div>}
      <TreeRenderer nodes={employees} renderComponent={EmployeeCard} />

    </div>
  );
};