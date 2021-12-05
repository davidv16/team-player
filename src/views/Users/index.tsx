import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../components/Loading';
import UserList from '../../components/UserList';
import { useStore } from '../../stores/store';

function Users() {
  const { teamUserStore } = useStore();
  const {loadingInitial, users } = teamUserStore;

  /*
  useEffect(() => {
    if (userRegistry.size <= 1) loadUsers();
  }, [userRegistry.size, loadUsers]);
*/
  // checks if the frontend is loading before it renders the Loading component
  if (loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column>
        <UserList users={users} />
      </Grid.Column>
    </Grid>
  );
}

export default observer(Users);
