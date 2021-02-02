import { RootState } from "../model/root.reducer";
import { ListDto } from "./list.dto";

export const selectListsWithTodos = (state: RootState): ListDto[] => {
    return Object.keys(state.lists.entities).map((listId: string) => {
        const list = state.lists.entities[listId];

        return {
            ...list,
            todos: list.todoIds.map((cardId: string) => {
                return state.todos.entities[cardId]
            })
        };
    });
};
