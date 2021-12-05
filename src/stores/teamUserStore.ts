import { makeAutoObservable, runInAction } from 'mobx';
import ITeam from '../models/ITeam';
import ITeamDetail from '../models/ITeamDetail';
import IUser from '../models/IUser';
import IUserDetail from '../models/IUserDetail';
import services from '../services';

export default class TeamUserStore {
  teamRegistry = new Map<string, ITeam>();
  userRegistry = new Map<string, IUser>();

  selectedTeam: ITeamDetail | undefined = undefined;
  selectedUser: IUser | undefined;
  // editMode = false;
  // loading = false;

  loadingInitial = false;

  constructor() {
    // this function is going to be used when this class is called
    makeAutoObservable(this);
  }

  get teamsSorted() {
    return Array.from(
      this.teamRegistry.values()
    ).sort(((a, b) => (
      (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
    )));
  }

  get users() {
    return Array.from(
      this.userRegistry.values()
    ).sort(((a, b) => (
      (a.displayName > b.displayName) ? 1 : ((b.displayName > a.displayName) ? -1 : 0)
    )));
  }

  getTeamUsers = (ids: string[]) => {
    const teamUsers: IUser[] = [];

    runInAction(() => {
      for (const id of ids) {
        teamUsers.push(this.getUser(id) as IUser);
      }
    });
    return this.sortUser(teamUsers);
  }

  getUserById = (id: string) => {
    console.log(id)
    let user;
    runInAction(() => {
      user = this.getUser(id);
    });
    return user;
  };

  sortUser = (users: IUser[]) => {
    return users.sort(((a, b) => (
      (a.displayName > b.displayName) ? 1 : ((b.displayName > a.displayName) ? -1 : 0)
    )));
  }

  loadUsers = async () => {
    // start loading symbol
    this.loadingInitial = true;
    try {
      const users = await services.Users.list();

      users.forEach((user) => {
        this.setUser(user);
      });
      // turn of the loading
      this.setLoadingInitial(false);
    } catch (e) {
      console.log(e);
      // turn of the loading
      this.setLoadingInitial(false);
    }
  };

  // a function that gets a single user
  loadUser = async (id: string) => {
    try {
      // and run the axios to get the single user from the api
      let user = await services.Users.details(id);
      // run the helper function to set the current user
      // to the user map
      this.setUser(user);
      // to avoid type script errors
      runInAction(() => {
        // set the user to the selected user
        this.selectedUser = user;
      });
      // set the loading symbol to false
      this.setLoadingInitial(false);
      // ensures we return a promise that is either user or undefined
      return user;
    } catch (e) {
      // otherwise catch the error.
      console.log(e);
      // set the loading symbol to false
      this.setLoadingInitial(false);
    }
  };

  loadTeams = async () => {
    // start loading symbol
    this.loadingInitial = true;
    try {
      const teams = await services.Teams.list();

      teams.forEach((team) => {
        this.setTeam(team);
      });
      // turn of the loading
      this.setLoadingInitial(false);
    } catch (e) {
      console.log(e);
      // turn of the loading
      this.setLoadingInitial(false);
    }
  };

  // a function that gets a single team
  loadTeam = async (id: string) => {
    // checks if the current team exists
    let team = await services.Teams.details(id);
    // if team exists
    if (team) {
      // set the team to the selected team
      this.selectedTeam = team;
      // ensures we return a promise that is either team or undefined
      return team;
    }
    // otherwise start loading
    this.loadingInitial = true;
    try {
      // and run the axios to get the single team from the api
      team = await services.Teams.details(id);
      // run the helper function to set the current team
      // to the team map
      this.setTeam(team);
      // to avoid type script errors
      runInAction(() => {
        // set the team to the selected team
        this.selectedTeam = team;
      });
      // set the loading symbol to false
      this.setLoadingInitial(false);
      // ensures we return a promise that is either team or undefined
    } catch (e) {
      // otherwise catch the error.
      console.log(e);
      // set the loading symbol to false
      this.setLoadingInitial(false);
    }
    console.log(team.teamLeadId);
    //this.selectedUser = this.getUserById(team.teamLeadId);
    return team as ITeamDetail;
  };


  private setUser = (user: IUser) => {
    //this.userRegistry.set(user.id, user);
    this.userRegistry.set(user.id, user);
  };

  
  private getUser = (id: string) => {
    return this.userRegistry.get(id);
  };

  private setTeam = (team: ITeam) => {
    this.teamRegistry.set(team.id, team);
  };

  private getTeam = (id: string) => {
    return this.teamRegistry.get(id);
  };

  // action to turn the loading symbol on
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
}