import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
import { List } from "./list";
import { ListDto } from "./list.dto";
import { selectListsWithTodos } from "./select-lists-with-todos";
import { listsActions } from "./lists.actions";

export const Lists = () => {
  const lists = useSelector(selectListsWithTodos);

  const dispatch = useDispatch();

  const onAddListClick = () => {
    dispatch(listsActions.addList());
  };

  return (
    <Container fluid>
      <Row className="pt-3 pb-3">
        <Col>
          <Button type="button" onClick={onAddListClick} size="lg">Add list</Button>
        </Col>
      </Row>
      <Row>
        {lists.map((list: ListDto) => {
          return <List key={list.id} {...list} />
        })}
      </Row>
    </Container>
  );
};
