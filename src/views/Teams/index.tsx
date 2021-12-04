import React from 'react';
import { Grid } from 'semantic-ui-react';
import TeamList from '../../components/TeamList';

export default function Teams() {
  return (
    <Grid>
      <Grid.Column>
        <TeamList />
      </Grid.Column>
    </Grid>
  );
}
