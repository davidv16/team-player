import React from 'react';
import { observer } from 'mobx-react-lite';
import UserListItem from '../UserListItem';
import { useStore } from '../../stores/store';
import IUser from '../../models/IUser';

interface Props {
  users: IUser[];
}

function UserList({ users }: Props) {
  return (
    <>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </>
  );
}

export default observer(UserList);
