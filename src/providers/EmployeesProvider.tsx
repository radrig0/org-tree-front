'use client';

import { createContext, FC, PropsWithChildren, useState } from 'react';
import { IEmployee } from '@/app/_orgTree/models';
import { create, deleteById, getList, updateParentId } from '@/actions/employeesActions';

export enum EMPLOYEES_MODE {
  READ,
  EDIT,
}

interface EmployeesProviderProps {
  mode: EMPLOYEES_MODE;
  editedEmployeeId: number | null,
  selectedParentId: number | null,
  employees: IEmployee[],
  isPending: Boolean;
  loadEmployees: () => Promise<void>,
  deleteEmployee: (id: number) => Promise<void>,
  createEmployee: (newEmployee: Omit<IEmployee, 'id'>) => Promise<void>,
  markEmployeeAsEdit: (employee: IEmployee) => void;
  setParentId: (parentId: number | null) => void;
  save: () => Promise<void>
  cancel: () => void;
}

const DEFAULT_STATE: EmployeesProviderProps = {
  mode: EMPLOYEES_MODE.READ,
  editedEmployeeId: null,
  selectedParentId: null,
  employees: [],
  isPending: false,
  loadEmployees: async () => {
  },
  deleteEmployee: async () => {
  },
  createEmployee: async () => {
  },
  markEmployeeAsEdit: () => {
  },
  setParentId: () => {
  },
  save: async () => {
  },
  cancel: () => {
  },
};

export const EmployeesContext = createContext<EmployeesProviderProps>(DEFAULT_STATE);

export const EmployeesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState(DEFAULT_STATE.mode);
  const [editedEmployeeId, setEditedEmployeeId] = useState(DEFAULT_STATE.editedEmployeeId);
  const [selectedParentId, setSelectedParentId] = useState(DEFAULT_STATE.selectedParentId);
  const [employees, setEmployees] = useState(DEFAULT_STATE.employees);
  const [isPending, setIsPending] = useState(false);

  const loadEmployees = async () => {
    setIsPending(true);
    const fetchedList = await getList().finally(() => setIsPending(false));
    setEmployees(fetchedList);
  };

  const deleteEmployee = async (id: number) => {
    setIsPending(true);
    await deleteById(id).finally(() => setIsPending(false));
    setEmployees(prevState => {
      return prevState.filter(empl => empl.id !== id);
    });
  };

  const createEmployee = async (newEmployee: Omit<IEmployee, 'id'>) => {
    setIsPending(true);
    const createdEmployee = await create(newEmployee).finally(() => setIsPending(false));

    if (createdEmployee) {
      setEmployees(prevState => {
        return [...prevState, createdEmployee];
      });
    }
  };

  const editEmployee = (employee: IEmployee) => {
    setMode(EMPLOYEES_MODE.EDIT);
    setEditedEmployeeId(employee.id);
    setSelectedParentId(employee.parentId);
  };

  const stopEdit = () => {
    setMode(EMPLOYEES_MODE.READ);
    setEditedEmployeeId(null);
    setSelectedParentId(null);
  };

  const save = async () => {
    if (editedEmployeeId === null) {
      // TODO: add some handler for this case
      stopEdit();
      return;
    }
    setIsPending(true);
    const updatedEmployee = await updateParentId(editedEmployeeId, selectedParentId)
      .finally(() => setIsPending(false));
    if (updatedEmployee) {
      setEmployees(prevState => {
        return prevState.map(empl => empl.id === editedEmployeeId ? updatedEmployee : empl);
      });
    }
    stopEdit();
  };

  return (
    <EmployeesContext.Provider
      value={{
        mode,
        editedEmployeeId: editedEmployeeId,
        selectedParentId: selectedParentId,
        employees,
        isPending,
        deleteEmployee,
        createEmployee,
        loadEmployees,
        markEmployeeAsEdit: editEmployee,
        setParentId: setSelectedParentId,
        save,
        cancel: stopEdit,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};