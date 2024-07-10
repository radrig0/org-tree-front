'use client';

import { FC, ReactNode } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import styles from './dropdownMenu.module.css';
import { CogIcon } from '@/components/icons/CogIcon';

interface IOption {
  content: ReactNode;
  action: () => void;
}

interface IProps {
  options: Array<IOption>;
}

export const DropdownMenu: FC<IProps> = ({ options }) => {
  return (
    <Menu>
      <MenuButton
        className={styles.menuButton}>
        <CogIcon width={24} height={24} />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className={styles.menuItems}
      >
        {options.map((option, index) => {
          return (
            <MenuItem key={index}>
              <button onClick={option.action} className={`${styles.menuItem}`}>
                {option.content}
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};