import { createContext, useContext } from 'react';
import TeamStore from './teamUserStore';

interface Store {
  // Gets in the teamPlayerStore class.
  teamUserStore: TeamStore;
}

// Export the teamPlayerStore class as a store.
export const store: Store = {
  // Create a new instance of the class.
  teamUserStore: new TeamStore(),
};

// We then pass in our store to the react context.
export const StoreContext = createContext(store);

// Custom react hook that allows use our stores in our components.
export function useStore() {
  return useContext(StoreContext);
}
