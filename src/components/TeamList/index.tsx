import React from 'react';
import { observer } from 'mobx-react-lite';
import TeamListItem from '../TeamListItem';
import { useStore } from '../../stores/store';

function TeamList() {
  const { teamUserStore } = useStore();
  const { teamsSorted } = teamUserStore;

  return (
    <>
      {teamsSorted.map((team) => (
        <TeamListItem key={team.id} team={team} />
      ))}
    </>
  );
}

export default observer(TeamList);
