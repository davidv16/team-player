import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Header, Icon, Image, Item, Segment } from 'semantic-ui-react';
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
    console.log(user?.avatarUrl)
    // set the url id and loadActivity function as a dependency
  }, [id, loadUser]);

  if (!user) return <LoadingComponent />;

  return (
    <Segment.Group>
      <Segment>
        <Segment basic>
          <Item.Group>
            <Item>
              <Item.Content>
            <Grid>
              <Grid.Column width={2} />
                <Header style={{alignContent:"center"}} as="h2" icon textAlign="center">
                  <Icon name="user" circular />
                  <Image href={`user.avatarUrl`} />
                  <Header.Content>{`User: ${user.firstName} ${user.lastName}`}</Header.Content>
                <Header.Subheader>{`username: ${user.displayName}`}</Header.Subheader>
                <Header.Subheader>{`location: ${user.location}`}</Header.Subheader>
                </Header>              
              <Grid.Column width={2} />
            </Grid>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
    </Segment.Group>
  );
}

export default observer(UserDetail);
