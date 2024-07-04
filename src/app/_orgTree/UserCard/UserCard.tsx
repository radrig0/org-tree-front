import { FC } from "react";
import { IUser } from "@/app/_orgTree/models";
import styles from './userCard.module.css'


interface IProps {
  user: IUser
}

export const UserCard: FC<IProps> = ({user}) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <svg width={50} height={50} xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"
             strokeWidth={1.5}
             stroke="currentColor"
             className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
        </svg>
      </div>
      <div>{user.firstname}</div>
      <div>{user.lastname}</div>
    </div>
  )
}