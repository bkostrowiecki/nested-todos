import { combineReducers } from "redux";
import { cardsReducer, TodosState } from "./todos/todos.reducer";
import { listsReducer, ListsState } from "./lists/lists.reducer";

export type RootState = {
  lists: ListsState;
  todos: TodosState;
};

export const rootReducer = combineReducers({
  lists: listsReducer,
  todos: cardsReducer,
});
