import { createAppStore } from "../store";
import { todosActions } from "../view/todos.actions";

describe('Todos', () => {
    describe('edit todo', () => {
        it('edits todos', () => {
            const store = createAppStore({
                todos: {
                    entities: {
                        '123': {
                            id: '123',
                            title: 'Title A',
                            listId: 'List id'
                        }
                    }
                }
            });

            const action = todosActions.editTodo('123', 'Title B');
            store.dispatch(action);

            expect(store.getState().todos.entities['123'].title).toEqual('Title B');
        });  

        it('does not create new todo just with title', () => {
            const store = createAppStore();

            const action = todosActions.editTodo('123', 'Title B');

            expect(() => {
                store.dispatch(action);
            }).toThrowError();
        });
    });

    describe('delete todo', () => {
        it('deletes todo', () => {
            const store = createAppStore({
                todos: {
                    entities: {
                        '123': {
                            id: '123',
                            title: 'Title A',
                            listId: '456'
                        }
                    }
                }
            });

            const action = todosActions.deleteTodo('123');
            store.dispatch(action);

            expect(store.getState().todos.entities['123']).not.toBeDefined();
        });

        it('deletes todo from list', () => {
            const store = createAppStore({
                todos: {
                    entities: {
                        '123': {
                            id: '123',
                            title: 'Title A',
                            listId: '456'
                        }
                    }
                },
                lists: {
                    entities: {
                        '456': {
                            id: '456',
                            todoIds: ['123']
                        }
                    }
                }
            });

            const action = todosActions.deleteTodo('123');
            store.dispatch(action);

            expect(store.getState().lists.entities['456'].todoIds).not.toContain('123');
        })
    });
});