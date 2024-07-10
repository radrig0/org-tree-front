'use client';

import { FC, useCallback, useContext, useMemo } from 'react';
import { IEmployee } from '@/app/_orgTree/models';
import styles from './employeeCard.module.css';
import { DropdownMenu } from '@/components/dropdownMenu/DropdownMenu';
import { UserIcon } from '@/components/icons/UserIcon';
import { EditIcon } from '@/components/icons/EditIcon';
import { TrashIcon } from '@/components/icons/TrashIcon';
import { EMPLOYEES_MODE, EmployeesContext } from '@/providers/EmployeesProvider';
import { SaveIcon } from '@/components/icons/SaveIcon';
import { CrossIcon } from '@/components/icons/CrossIcon';
import { PlusIcon } from '@/components/icons/PlusIcon';

enum EMPLOYEE_CARD_MODE {
  DEFAULT,
  EDITING,
  SELECTED,
  AVAILABLE,
}

export const EmployeeCard: FC<IEmployee> = (employee) => {
  const {
    mode,
    editedEmployeeId,
    selectedParentId,
    deleteEmployee,
    markEmployeeAsEdit,
    save,
    cancel,
    setParentId,
  } = useContext(EmployeesContext);

  const employeeCardMode = useMemo(() => {
    if (mode === EMPLOYEES_MODE.READ) {
      return EMPLOYEE_CARD_MODE.DEFAULT;
    } else {
      switch (employee.id) {
        case editedEmployeeId:
          return EMPLOYEE_CARD_MODE.EDITING;
        case selectedParentId:
          return EMPLOYEE_CARD_MODE.SELECTED;
        default:
          return EMPLOYEE_CARD_MODE.AVAILABLE;
      }
    }
  }, [editedEmployeeId, employee.id, mode, selectedParentId]);

  const options = useMemo(() => {
    return [
      {
        content: <>
          <EditIcon height={24} width={24} />
          Change head
        </>,
        action: () => markEmployeeAsEdit(employee),
      },
      {
        content: <>
          <TrashIcon height={24} width={24} />
          Delete
        </>,
        action: () => deleteEmployee(employee.id),
      },
    ];
  }, [deleteEmployee, markEmployeeAsEdit, employee]);

  const buttons = useMemo(() => {
    switch (employeeCardMode) {
      case EMPLOYEE_CARD_MODE.DEFAULT:
        return <div className={styles.menu}><DropdownMenu options={options} /></div>;
      case EMPLOYEE_CARD_MODE.AVAILABLE:
        return <button className={styles.actionButton}>
          <PlusIcon height={24} width={24} />
        </button>;
      case EMPLOYEE_CARD_MODE.EDITING:
        return <>
          <button className={styles.actionButton} onClick={save}><SaveIcon height={24} width={24} /></button>
          <button className={`${styles.actionButton} ${styles.leftButton}`} onClick={cancel}>
            <CrossIcon height={24} width={24} />
          </button>
        </>;
      case EMPLOYEE_CARD_MODE.SELECTED:
        return <button className={styles.actionButton}>
          <CrossIcon height={24} width={24} />
        </button>;
      default:
        return <></>;
    }
  }, [cancel, employeeCardMode, options, save]);

  const onCardClick = useCallback(() => {
    switch (employeeCardMode) {
      case EMPLOYEE_CARD_MODE.AVAILABLE:
        return setParentId(employee.id);
      case EMPLOYEE_CARD_MODE.SELECTED:
        return setParentId(null);
      case EMPLOYEE_CARD_MODE.EDITING:
      default:
        return;
    }
  }, [employee.id, employeeCardMode, setParentId]);

  const cardClassName = useMemo(() => {
    switch (employeeCardMode) {
      case EMPLOYEE_CARD_MODE.AVAILABLE:
        return styles.availableCard;
      case EMPLOYEE_CARD_MODE.EDITING:
        return styles.editedCard;
      case EMPLOYEE_CARD_MODE.SELECTED:
        return styles.selectedCard;
      default:
        return '';
    }
  }, [employeeCardMode]);

  return (
    <div
      className={`${styles.card} ${cardClassName}`}
      onClick={onCardClick}
    >
      <div className={styles.userIcon}>
        <UserIcon height={50} width={50} />
      </div>
      {buttons}
      <div>{employee.firstName}</div>
      <div>{employee.lastName}</div>
    </div>
  );
};