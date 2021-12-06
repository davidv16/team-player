import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Icon, Item, Segment,
} from 'semantic-ui-react';
import ITeam from '../../models/ITeam';

interface Props {
  team: ITeam;
}

export default function TeamListItem({ team }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Icon name="users" circular />
            <Item.Content>
              <Item.Header as={Link} exact to={`/teams/${team.id}`}>
                {team.name}
              </Item.Header>
              <Button
                as={Link}
                exact
                to={`/teams/${team.id}`}
                color="teal"
                floated="right"
                content="View"
              />
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
