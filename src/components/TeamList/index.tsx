import React, { useState, Fragment, useEffect } from 'react';
import ITeam from '../../models/ITeam';
import dummyTeam from '../../resources/dummyTeam.json';
import TeamListItem from '../TeamListItem';
import * as teamService from '../../services/TeamService';

export default function TeamList() {
  const [teams, setTeams] = useState<ITeam[]>(dummyTeam);

  useEffect(() => {
    (async () => {
      teamService.getTeams().then((response) => {
        const teamImport: ITeam[] = [];
        response.forEach((team) => {
          teamImport.push(team);
        });
        setTeams(teamImport);
      });
    })();
  }, []);
  return (
    <>
      {teams.map((team) => (
        <TeamListItem key={team.id} team={team} />
      ))}
    </>
  );
}
