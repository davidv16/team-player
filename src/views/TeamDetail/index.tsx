import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Segment, Image, Item, Header, Icon } from 'semantic-ui-react';
import LoadingComponent from '../../components/Loading';
import UserList from '../../components/UserList';
import ITeam from '../../models/ITeam';
import ITeamDetail from '../../models/ITeamDetail';
import IUser from '../../models/IUser';
import IUserDetail from '../../models/IUserDetail';
import { useStore } from '../../stores/store';
import Users from '../Users';

function TeamDetail() {
  const { teamUserStore } = useStore();
  const { selectedTeam: team, selectedUser: teamLeader, loadTeam, getTeamUsers } = teamUserStore;
  const { id } = useParams();
  //const [ teamLeader, setTeamLeader ] = useState(getUserById(team.teamLeadId))

  useEffect(() => {
    // check if id from url parameters exists
    // load a single activity with the id from the url
    if (id) loadTeam(id);
    // set the url id and loadActivity function as a dependency
  }, [id, loadTeam]);
  
  if (!team) return <LoadingComponent />;
  return (
    <Segment.Group>
      {/** header */}
      <Segment>
        <Segment basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header as="h2" icon textAlign="center">
                  <Icon name="users" circular />
                  <Header.Content>{`Team: ${team.name}`}</Header.Content>
              <Item>
                {/*@ts-ignore*/}
                <p>{teamLeader.displayName}</p>
              </Item>
                </Header>
              </Item.Content>
              <Item>
                <UserList users={getTeamUsers(team.teamMemberIds)} />
              </Item>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
    </Segment.Group>
  );
}

export default observer(TeamDetail);
