import { createContext, useContext } from 'react';
import TeamStore from './teamUserStore';

interface Store {
  // gets in the teamPlayerStore class
  teamUserStore: TeamStore;
}

// export the teamPlayerStore class as a store
export const store: Store = {
  // create a new instance of the class
  teamUserStore: new TeamStore(),
};

// we then pass in our store to the react context
export const StoreContext = createContext(store);

// a custom react hook that allows use our stores in our components
export function useStore() {
  // also a react hook to use the
  return useContext(StoreContext);
}
