import { createAction } from 'typesafe-actions';
import * as uuid from 'uuid';

const addList = createAction(
    'lists/addList',
    () => ({
        id: uuid.v4()
    }),
  )();

const deleteList = createAction(
    'lists/deleteList',
    (id: string) => ({
        id
    }),
)();

const addTodoToList = createAction(
    'lists/addTodoToList',
    (listId: string) => ({
        listId,
        id: uuid.v4(),
        title: 'New todo'
    }),
  )();



export const listsActions = {
    addList,
    deleteList,
    addTodoToList
};
