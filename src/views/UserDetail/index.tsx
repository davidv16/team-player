import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../components/Loading';
import { useStore } from '../../stores/store';

function UserDetail() {
  const { teamUserStore } = useStore();
  const { selectedUser: user, loadUser } = teamUserStore;
  const { id } = useParams();

  useEffect(() => {
    // check if id from url parameters exists
    // load a single activity with the id from the url
    if (id) loadUser(id);
    // set the url id and loadActivity function as a dependency
  }, [id, loadUser]);

  if (!user) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10} />
      <Grid.Column width={6} />
    </Grid>
  );
}

export default observer(UserDetail);
