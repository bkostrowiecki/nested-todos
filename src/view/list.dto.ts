import { TodoDto } from "./todo/todo.dto";

export interface ListDto {
    id: string;
    todos: TodoDto[];
}
