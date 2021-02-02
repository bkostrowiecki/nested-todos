import { Store } from "redux";
import { rootReducer, RootState } from "./model/root.reducer";

import { createStore } from "redux";

export const createAppStore = (initialState?: Partial<RootState>): Store => {
  const extendedWindow: any = window as any & Window;

  const enhancers =
    extendedWindow.__REDUX_DEVTOOLS_EXTENSION__ &&
    extendedWindow.__REDUX_DEVTOOLS_EXTENSION__();

  const store = createStore(rootReducer, initialState, enhancers);

  return store;
};
