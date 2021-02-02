import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, CardBody, CardFooter, Input } from "reactstrap";
import { TodoDto } from "./todo.dto";
import { todosActions } from "./todos.actions";

export const Todo: React.FC<TodoDto> = ({ id, title }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [titleInEdit, setTitleInEdit] = useState(title);

  const dispatch = useDispatch();

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onDeleteClick = () => {
    dispatch(todosActions.deleteTodo(id));
  };

  const onSaveEditingClick = () => {
    dispatch(todosActions.editTodo(id, titleInEdit));

    setIsEditing(false);
  };

  const onCancelEditingClick = () => {
    setIsEditing(false);
  };

  const onTitleInEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInEdit(event.target.value);
  };

  return (
    <Card color="light" className="mt-3">
      <CardBody>
        {!isEditing && title}
        {Boolean(isEditing) && (
          <Input
            type="text"
            id="title"
            value={titleInEdit}
            onChange={onTitleInEditChange}
          />
        )}
      </CardBody>
      <CardFooter>
        {!isEditing && (
          <>
            <Button
              type="button"
              color="primary"
              size="sm"
              onClick={onEditClick}
            >
              Edit
            </Button>
            {' '}
            <Button
              type="button"
              color="danger"
              size="sm"
              onClick={onDeleteClick}
            >
              Delete
            </Button>
          </>
        )}
        {Boolean(isEditing) && (
          <>
            <Button
              type="button"
              color="success"
              size="sm"
              onClick={onSaveEditingClick}
            >
              Save
            </Button>
            {' '}
            <Button
              type="button"
              color="warning"
              size="sm"
              onClick={onCancelEditingClick}
            >
              Cancel
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
