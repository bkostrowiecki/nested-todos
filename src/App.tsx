import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { Lists } from "./view/lists";
import { createAppStore } from "./store";

export type List = {}

function App() {
  return (
    <Provider store={createAppStore()}>
      <Lists />
    </Provider>
  );
}

export default App;
