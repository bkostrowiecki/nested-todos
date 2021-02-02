import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
} from "reactstrap";
import { ListDto } from "./list.dto";
import { listsActions } from "./lists.actions";
import { Todo } from "./todo";

export const List: React.FC<ListDto> = ({ id, todos }) => {
  const dispatch = useDispatch();

  const onAddCardClick = () => {
    dispatch(listsActions.addTodoToList(id));
  };

  const onDeleteListClick = () => {
    dispatch(listsActions.deleteList(id));
  };

  return (
    <Col style={{ maxWidth: "420px" }}>
      <Card>
        <CardHeader>
          <CardTitle>
            {id.split("-")[0]}

            <Button
              type="button"
              color="danger"
              onClick={onDeleteListClick}
              size="sm"
              className="float-right"
            >
              Delete list
            </Button>
          </CardTitle>
        </CardHeader>
        <CardBody className="pt-1">
          {todos.map((todo) => {
            return <Todo key={todo.id} {...todo} />;
          })}
        </CardBody>
        <CardFooter>
          <Button type="button" color="primary" onClick={onAddCardClick} block>
            Add card
          </Button>
        </CardFooter>
      </Card>
    </Col>
  );
};
