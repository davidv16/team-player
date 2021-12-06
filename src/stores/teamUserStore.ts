import { makeAutoObservable, runInAction } from 'mobx';
import ITeam from '../models/ITeam';
import ITeamDetail from '../models/ITeamDetail';
import IUser from '../models/IUser';
import IUserDetail from '../models/IUserDetail';
import services from '../services';

export default class TeamUserStore {
  // A list to store the teams
  teamRegistry = new Map<string, ITeam>();

  // A list to store the users
  userRegistry = new Map<string, IUser>();

  // A list to store the team members for the detailed user view
  teamMembers = new Map<string, IUser>();

  // A variable to store the current team
  selectedTeam: ITeamDetail | undefined = undefined;

  // A variable to store the current user
  selectedUser: IUserDetail | undefined = undefined;

  // A variable to store the team leader
  teamLeader: IUser | undefined = undefined;

  // Bool variable to turn the loading spinner off and on.
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * @function teamMembersSorted
   * @return an Array of sorted team members
   */
  get teamMembersSorted() {
    return Array.from(
      this.teamMembers.values(),
    ).sort(((a, b) => (
      (a.displayName > b.displayName) ? 1 : ((b.displayName > a.displayName) ? -1 : 0)
    )));
  }

  /**
   * @function teamsSorted
   * @return an Array of sorted teams
   */
  get teamsSorted() {
    return Array.from(
      this.teamRegistry.values(),
    ).sort(((a, b) => (
      (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
    )));
  }

  /**
   * @function usersSorted
   * @return an Array of sorted users
   */
  get usersSorted() {
    return Array.from(
      this.userRegistry.values(),
    ).sort(((a, b) => (
      (a.displayName > b.displayName) ? 1 : ((b.displayName > a.displayName) ? -1 : 0)
    )));
  }

  /**
   * @function loadUsers
   * loads a list of users from the api to the user registry
   */
  loadUsers = async () => {
    // Start loading symbol.
    this.loadingInitial = true;
    try {
      // Fetch the users from the api.
      const users = await services.Users.list();

      users.forEach((user) => {
        this.setUser(user);
      });
      // Turn of the loading.
      this.setLoadingInitial(false);
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
      // Turn of the loading.
      this.setLoadingInitial(false);
    }
  };

  /**
   * @function loadUser
   * Function that loads a single user from the api
   * @param id
   * @returns user
   */
  loadUser = async (id: string) => {
    // Fetches a single user from the api.
    const user = await services.Users.details(id);
    try {
      // Run the helper function to set the current user to the user map.
      this.setUser(user);
      // To avoid type script errors.
      runInAction(() => {
        // Set the user to the selected user.
        this.selectedUser = user;
      });
      // Set the loading symbol to false.
      this.setLoadingInitial(false);
      // Ensures we return a promise that is either user or undefined.
      return user;
    } catch (e) {
      // Otherwise catch the error.
      // eslint-disable-next-line
      console.error(e);
      // Set the loading symbol to false.
      this.setLoadingInitial(false);
    }
    return user;
  };

  /**
   * @function loadTeams
   * Function to load a list of teams from the api
   */
  loadTeams = async () => {
    // Start loading symbol.
    this.loadingInitial = true;
    try {
      // Fetches the teams from the api.
      const teams = await services.Teams.list();
      // Runs through the list of teams and appends them to the team registry.
      teams.forEach((team) => {
        this.setTeam(team);
      });
      // Turn of the loading.
      this.setLoadingInitial(false);
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
      // Turn of the loading.
      this.setLoadingInitial(false);
    }
  };

  /**
   * @function loadTeam
   * Function that loads a single team from the api
   * @param id
   * @returns team
   */
  loadTeam = async (id: string) => {
    // Fetches a single team from the api.
    let team = await services.Teams.details(id);
    // If team exists.
    if (team) {
      // Set the team to the selected team.
      this.selectedTeam = team;
      // Sets the team leader.
      this.teamLeader = this.getUser(team.teamLeadId);
      // Sets the team members to a team member registry.
      this.setTeamMembers(team.teamMemberIds);
      // Ensures we return a promise that is either team or undefined.
      return team;
    }
    // Otherwise start loading
    this.loadingInitial = true;
    try {
      // and run the axios to get the single team from the api.
      team = await services.Teams.details(id);
      // Run the helper function to set the current team to the team map.
      this.setTeam(team);
      // To avoid type script errors.
      runInAction(() => {
        // Set the team to the selected team.
        this.selectedTeam = team;
        // Sets the team leader.
        this.teamLeader = this.getUser(team.teamLeadId);
        // Sets the team members to a team member registry.
        this.setTeamMembers(team.teamMemberIds);
      });
      // Set the loading symbol to false.
      this.setLoadingInitial(false);
    } catch (e) {
      // otherwise catch the error.
      // eslint-disable-next-line
      console.error(e);
      // Set the loading symbol to false.
      this.setLoadingInitial(false);
    }
    return team as ITeamDetail;
  };

  /**
   * @function setTeamMembers
   * Helper function that loops through the team member id's
   * and writes the team members to the team member registry.
   * @param ids
   */
  private setTeamMembers = (ids: string[]) => {
    ids.forEach((id) => {
      this.teamMembers.set(id, this.getUser(id) as IUser);
    });
  };

  /**
   * @function setUser
   * Helper function to add a user to the user registry.
   * @param user
   */
  private setUser = (user: IUser) => {
    this.userRegistry.set(user.id, user);
  };

  /**
   * @function getUser
   * Helper function to get a user from the user registry by id.
   * @param id
   * @returns
   */
  private getUser = (id: string) => this.userRegistry.get(id);

  /**
   * @function setTeam
   * Helper function to add a team to the team registry.
   * @param team
   */
  private setTeam = (team: ITeam) => {
    this.teamRegistry.set(team.id, team);
  };

  /**
   * @functon setLoadingInitial
   * Function to set the loading spinner on or off.
   * @param state
   */
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
}
