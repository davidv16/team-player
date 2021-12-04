import axios, { AxiosResponse } from 'axios';
import ITeam from '../../models/ITeam';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
export function getTeams() {
  return axios
    .get<ITeam[]>(
      'https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/'
    )
    .then(responseBody);
}

export function getUsers() {
  return axios
    .get<ITeam[]>(
      'https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/users/'
    )
    .then(responseBody);
}
