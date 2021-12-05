import axios, { AxiosResponse } from 'axios';
import ITeam from '../models/ITeam';
import ITeamDetail from '../models/ITeamDetail';
import IUser from '../models/IUser';
import IUserDetail from '../models/IUserDetail';

const teamUrl = 'https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/';
const userUrl = 'https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/users/';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  getTeams: <T>(url: string) => axios.get<T>(url).then(responseBody),
  getUsers: <T>(url: string) => axios.get<T>(url).then(responseBody),
};

const Teams = {
  list: () => requests.getTeams<ITeam[]>(teamUrl),
  details: (id: string) => requests.getTeams<ITeamDetail>(`${teamUrl}${id}`),
};

const Users = {
  list: () => requests.getUsers<IUser[]>(userUrl),
  details: (id: string) => requests.getTeams<IUserDetail>(`${userUrl}${id}`),
};

const services = {
  Teams,
  Users,
};

export default services;
