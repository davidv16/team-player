import React, { useEffect } from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Teams from '../views/Teams';
import NavBar from '../components/NavBar';
import Users from '../views/Users';
import TeamDetail from '../views/TeamDetail';
import { useStore } from '../stores/store';
// import TeamDetail from '../views/TeamDetail';

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Routes>
          <Route path="/" element={<Teams />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
