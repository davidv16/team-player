import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Grid, Segment, Item, Header, Icon,
} from 'semantic-ui-react';
import LoadingComponent from '../../components/Loading';
import UserList from '../../components/UserList';
import { useStore } from '../../stores/store';

function TeamDetail() {
  const { teamUserStore } = useStore();
  const {
    selectedTeam: team, teamLeader: leader, teamMembersSorted, loadTeam,
  } = teamUserStore;
  const { id } = useParams();

  useEffect(() => {
    // check if id from url parameters exists
    // load a single team with the id from the url
    if (id) loadTeam(id);
    // set the url id and loadTeam function as a dependency
  }, [id, loadTeam]);

  if (!team) return <LoadingComponent />;
  return (
    <Segment.Group>
      <Segment>
        <Segment basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Grid>
                  <Grid.Column width={2} />
                  <Header style={{ alignContent: 'center' }} as="h2" icon textAlign="center">
                    <Icon name="users" circular />
                    <Header.Content>{`Team: ${team.name}`}</Header.Content>
                    <Header.Subheader>{`Team Leader: ${leader?.displayName}`}</Header.Subheader>
                  </Header>
                  <Grid.Column width={2} />
                </Grid>
                <UserList users={teamMembersSorted} />
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
    </Segment.Group>
  );
}

export default observer(TeamDetail);
