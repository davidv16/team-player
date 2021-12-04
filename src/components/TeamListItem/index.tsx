import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react';
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
            <Item.Image size="tiny" />
            <Item.Content>
              <Item.Header as={Link} to={`/teams/${team.id}`}>
                {team.name}
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/teams/${team.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
