import React from 'react';
import UserListItem from '../UserListItem';
import IUser from '../../models/IUser';

interface Props {
  users: IUser[];
}

export default function UserList({ users }: Props) {
  return (
    <>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </>
  );
}
