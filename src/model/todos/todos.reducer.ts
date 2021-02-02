import { createReducer } from "typesafe-actions";
import { listsActions } from "../../view/lists.actions";
import { todosActions } from "../../view/todos.actions";
import { TodoEntity } from "./todo.entity";

export type TodosState = {
  entities: Record<string, TodoEntity>;
};

export const cardsReducer = createReducer({
  entities: {},
})
  .handleAction(
    listsActions.addTodoToList,
    (
      state: TodosState,
      action: ReturnType<typeof listsActions.addTodoToList>
    ): TodosState => {
      return {
        entities: {
          ...state.entities,
          [action.payload.id]: {
            ...action.payload,
          },
        },
      };
    }
  )
  .handleAction(
    todosActions.deleteTodo,
    (
      state: TodosState,
      action: ReturnType<typeof todosActions.deleteTodo>
    ): TodosState => {
      const entities = {
        ...state.entities,
      };

      delete entities[action.payload.id];

      return {
        entities,
      };
    }
  )
  .handleAction(
    todosActions.editTodo,
    (
      state: TodosState,
      action: ReturnType<typeof todosActions.editTodo>
    ): TodosState => {
      const entity = {
        ...state.entities[action.payload.id],
      };

      if (!state.entities[action.payload.id]) {
        throw new Error(
          "The editTodo action required you to give an existing todo id which was not given"
        );
      }

      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: {
            ...entity,
            title: action.payload.title,
          },
        },
      };
    }
  )
  .handleAction(
    listsActions.deleteList,
    (
      state: TodosState,
      action: ReturnType<typeof listsActions.deleteList>
    ): TodosState => {
      const entities = Object.values(state.entities)
        .filter((todo: TodoEntity) => {
          return todo.listId !== action.payload.id;
        })
        .reduce((prev: Record<string, TodoEntity>, curr: TodoEntity) => {
          prev[curr.id] = curr;

          return prev;
        }, {});

      return {
        ...state,
        entities,
      };
    }
  );
