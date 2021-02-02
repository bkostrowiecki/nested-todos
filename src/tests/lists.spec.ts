import { ListsState } from "../model/lists/lists.reducer";
import { RootState } from "../model/root.reducer";
import { createAppStore } from "../store";
import { listsActions } from "../view/lists.actions";

describe("Lists", () => {
  it("adds the list", () => {
    const store = createAppStore();

    const action = listsActions.addList();
    store.dispatch(action);

    const expectedState = {
      entities: {
        [action.payload.id]: {
          id: action.payload.id,
          todoIds: [],
        },
      },
    } as ListsState;

    expect(store.getState().lists).toEqual(expectedState);
  });

  describe("delete the list", () => {
    it("deletes the list", () => {
      const listsInitialState = {
        entities: {
          "123": {
            id: "123",
            todoIds: [],
          },
        },
      } as ListsState;

      const store = createAppStore({
        lists: listsInitialState,
      });

      expect(store.getState().lists.entities["123"]).not.toBeFalsy();

      const action = listsActions.deleteList("123");
      store.dispatch(action);

      const expectedState = {
        entities: {},
      } as ListsState;

      expect(store.getState().lists).toEqual(expectedState);
    });

    it("deletes all todos related to the list", () => {
      const initialState = {
        lists: {
          entities: {
            "123": {
              id: "123",
              todoIds: ["456"],
            },
          },
          todos: {
            entities: {
              "456": {
                id: "456",
                title: "New title",
                listId: "123",
              },
            },
          },
        },
      };

      const store = createAppStore(initialState);

      const action = listsActions.deleteList("123");
      store.dispatch(action);

      const expectedTodosState = {
        entities: {},
      } as ListsState;

      expect(store.getState().todos).toEqual(expectedTodosState);
    });
  });

  describe("add todo to the list", () => {
    it("adds todo to the list", () => {
      const store = createAppStore({
        lists: {
          entities: {
            "123": {
              id: "123",
              todoIds: [],
            },
          },
        },
      });

      const action = listsActions.addTodoToList("123");
      store.dispatch(action);

      const expectedState = {
        todos: {
          entities: {
            [action.payload.id]: {
              id: action.payload.id,
              title: action.payload.title,
              listId: "123",
            },
          },
        },
        lists: {
          entities: {
            "123": {
              id: "123",
              todoIds: [action.payload.id],
            },
          },
        },
      } as Partial<RootState>;

      expect(store.getState().todos).toEqual(expectedState.todos);
      expect(store.getState().lists).toEqual(expectedState.lists);
    });

    it("does not add todo to the list if not existing list id was given", () => {
      const store = createAppStore({
        lists: {
          entities: {},
        },
      });

      const action = listsActions.addTodoToList("123");

      expect(() => {
        store.dispatch(action);
      }).toThrowError();
    });
  });
});
