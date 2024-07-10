'use client';

import { ChangeEventHandler, useContext, useState } from 'react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import styles from './addEmployeeForm.module.css';
import { IEmployee } from '@/app/_orgTree/models';
import { EmployeesContext } from '@/providers/EmployeesProvider';

const emptyEmployee: Omit<IEmployee, 'id'> = {
  parentId: null,
  firstName: '',
  lastName: '',
};

export const AddEmployeeForm = () => {
  const { createEmployee } = useContext(EmployeesContext);
  let [isOpen, setIsOpen] = useState(false);
  let [newEmployee, setNewEmployee] = useState(emptyEmployee);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewEmployee(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onCreate = async () => {
    await createEmployee(newEmployee);
    setNewEmployee(emptyEmployee);
    setIsOpen(false);
  };

  const onCancel = () => {
    setNewEmployee(emptyEmployee);
    setIsOpen(false);
  };

  return (
    <>
      <button className={styles.button} onClick={() => setIsOpen(true)}>+ Add employee</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={styles.dialog}>
        <div className={styles.wrapper}>
          <DialogPanel className={styles.dialogPanel}>
            <DialogTitle>Create new employee</DialogTitle>
            <Description as={'div'}>
              <label className={styles.label}>
                First name:
                <input type="text" name="firstName" value={newEmployee.firstName} onChange={onChange} />
              </label>
              <label className={styles.label}>
                Last name:
                <input type="text" name="lastName" value={newEmployee.lastName} onChange={onChange} />
              </label>
            </Description>
            <div className={styles.buttons}>
              <button onClick={onCreate}>Create</button>
              <button onClick={onCancel}>Cancel</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};