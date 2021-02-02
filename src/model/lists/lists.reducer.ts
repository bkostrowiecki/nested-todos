import { createReducer } from "typesafe-actions";
import { listsActions } from "../../view/lists.actions";
import { todosActions } from "../../view/todos.actions";
import { ListEntity } from "./list.entity";

export type ListsState = {
  entities: Record<string, ListEntity>;
};

export const listsReducer = createReducer({
  entities: {},
})
  .handleAction(
    listsActions.addList,
    (
      state: ListsState,
      action: ReturnType<typeof listsActions.addList>
    ): ListsState => {
      return {
        entities: {
          ...state.entities,
          [action.payload.id]: {
            id: action.payload.id,
            todoIds: [],
          },
        },
      };
    }
  )
  .handleAction(
    listsActions.deleteList,
    (
      state: ListsState,
      action: ReturnType<typeof listsActions.deleteList>
    ): ListsState => {
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
    listsActions.addTodoToList,
    (
      state: ListsState,
      action: ReturnType<typeof listsActions.addTodoToList>
    ): ListsState => {
      const entity = {
        ...state.entities[action.payload.listId],
      };

      return {
        entities: {
          ...state.entities,
          [entity.id]: {
            ...entity,
            todoIds: entity.todoIds.concat(action.payload.id),
          },
        },
      };
    }
  )
  .handleAction(
    todosActions.deleteTodo,
    (
      state: ListsState,
      action: ReturnType<typeof todosActions.deleteTodo>
    ): ListsState => {
      const entities = Object.values(state.entities)
        .map(
          (list: ListEntity): ListEntity => {
            return {
              ...list,
              todoIds: list.todoIds.filter(
                (todoId: string) => todoId !== action.payload.id
              ),
            };
          }
        )
        .reduce((prev: Record<string, ListEntity>, curr: ListEntity) => {
          prev[curr.id] = curr;

          return prev;
        }, {});

      delete entities[action.payload.id];

      return {
        entities,
      };
    }
  );
