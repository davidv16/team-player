import React, { useState, Fragment, useEffect } from 'react';
import ITeam from '../../models/ITeam';
import dummyTeam from '../../resources/dummyTeam.json';
import TeamListItem from '../TeamListItem';
import * as teamService from '../../services/TeamService';
import UserListItem from '../UserListItem';

export default function UserList() {
  const [users, setUsers] = useState<ITeam[]>([]);

  useEffect(() => {
    (async () => {
      teamService.getUsers().then((response) => {
        const userImport: ITeam[] = [];
        response.forEach((user) => {
          userImport.push(user);
        });
        setUsers(userImport);
      });
    })();
  }, []);
  return (
    <>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </>
  );
}
