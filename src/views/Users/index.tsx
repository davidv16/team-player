import React from 'react';
import { Grid } from 'semantic-ui-react';
import UserList from '../../components/UserList';

export default function Users() {
  return (
    <Grid>
      <Grid.Column>
        <UserList />
      </Grid.Column>
    </Grid>
  );
}
