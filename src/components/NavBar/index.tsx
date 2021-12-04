import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          team-player
        </Menu.Item>
        <Menu.Item as={NavLink} to="/users" name="users" />
      </Container>
    </Menu>
  );
}
