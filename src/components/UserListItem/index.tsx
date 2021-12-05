import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import IUser from '../../models/IUser';

interface Props {
  user: IUser;
}

function UserListItem({ user }: Props) {
  
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Icon name="user" circular />
            <Item.Content>
              <Item.Header as={Link} to={`/users/${user.id}`}>
                {user.displayName}
              </Item.Header>
              <Button
                as={Link}
                to={`/users/${user.id}`}
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

export default observer(UserListItem);