import { createAction } from "typesafe-actions";

const deleteTodo = createAction("lists/deleteTodo", (id: string) => ({
  id,
}))();

const editTodo = createAction(
  "lists/editTodo",
  (id: string, title: string) => ({
    id,
    title,
  })
)();

export const todosActions = {
  deleteTodo,
  editTodo,
};
