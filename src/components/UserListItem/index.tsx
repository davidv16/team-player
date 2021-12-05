import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react';
import IUser from '../../models/IUser';

interface Props {
  user: IUser;
}

export default function UserListItem({ user }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" />
            <Item.Content>
              <Item.Header as={Link} to={`/teams/${user.id}`}>
                {user.displayName}
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/users/${user.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
