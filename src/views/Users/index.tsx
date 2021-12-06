import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../components/Loading';
import UserList from '../../components/UserList';
import { useStore } from '../../stores/store';

function Users() {
  const { teamUserStore } = useStore();
  const {
    loadingInitial,
    teamRegistry,
    userRegistry,
    loadTeams,
    loadUsers,
    usersSorted,
  } = teamUserStore;

  useEffect(() => {
    // checks if the teams and users are already loaded in the cache and loads them if they are not.
    if (teamRegistry.size <= 1) loadTeams();
    if (userRegistry.size <= 1) loadUsers();
  }, [teamRegistry.size, loadTeams, userRegistry.size, loadUsers]);

  // checks if the frontend is loading before it renders the Loading component
  if (loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column>
        <UserList users={usersSorted} />
      </Grid.Column>
    </Grid>
  );
}

export default observer(Users);
