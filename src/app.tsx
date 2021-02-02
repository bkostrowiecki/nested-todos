import React from "react";
import { Provider } from "react-redux";
import { Lists } from "./view/lists";
import { createAppStore } from "./store";

export function App() {
  return (
    <Provider store={createAppStore()}>
      <Lists />
    </Provider>
  );
}

