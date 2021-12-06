import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import TeamList from '../../components/TeamList';
import { useStore } from '../../stores/store';
import LoadingComponent from '../../components/Loading';

function Teams() {
  const { teamUserStore } = useStore();
  const {
    loadUsers, loadTeams, userRegistry, teamRegistry,
  } = teamUserStore;

  useEffect(() => {
    // checks if the teams and users are already loaded in the cache and loads them if they are not.
    if (teamRegistry.size <= 1) loadTeams();
    if (userRegistry.size <= 1) loadUsers();
  }, [teamRegistry.size, loadTeams, userRegistry.size, loadUsers]);

  // checks if the frontend is loading before it renders the Loading component
  if (teamUserStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column>
        <TeamList />
      </Grid.Column>
    </Grid>
  );
}

export default observer(Teams);
