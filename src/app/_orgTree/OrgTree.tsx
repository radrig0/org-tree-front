import { FC } from "react";
import { createUsers } from "@/app/_orgTree/testUsers";
import { UserCard } from "@/app/_orgTree/UserCard/UserCard";

const users = createUsers(20)

export const OrgTree: FC = () => {
  return (
    <>
      <div>OrgTree</div>
      <div>
        {users.map(user => {
          return <UserCard key={user.id} user={user}/>
        })}
      </div>
    </>
  )
}