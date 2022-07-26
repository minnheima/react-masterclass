import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState, TODO_LIST } from "../atom";
import styled from "styled-components";

const List = styled.li`
  font-weight: 400;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Btn = styled.button`
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0 3px;
  padding: 3px 5px;
  border-radius: 5px;
  &:hover {
    background-color: #fec406;
    transition: all 0.3s;
  }
  &.remove:hover {
    color: #fff;
    background-color: #ea2e15f5;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDos((prevToDos) => {
      const targetIdx = prevToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      const newToDoList = [...prevToDos.slice(0, targetIdx), newToDo, ...prevToDos.slice(targetIdx + 1)];
      // return [...prevToDos.slice(0, targetIdx), newToDo, ...prevToDos.slice(targetIdx + 1)];
      localStorage.setItem(TODO_LIST, JSON.stringify(newToDoList));
      return newToDoList;
    });
  };
  const onRemove = () => {
    setToDos((prevToDos) => {
      const targetIdx = prevToDos.findIndex((toDo) => toDo.id === id);
      // return [...prevToDos.slice(0, targetIdx), ...prevToDos.slice(targetIdx + 1)];
      const removeToDo = [...prevToDos.slice(0, targetIdx), ...prevToDos.slice(targetIdx + 1)];
      localStorage.setItem(TODO_LIST, JSON.stringify(removeToDo));
      return removeToDo;
      // const selectToDo = toDos.filter((toDo) => toDo.id !== id);
      // return selectToDo;
    });
  };
  return (
    <List>
      <span>{text}</span>
      <span>
        {category !== Categories.TO_DO && (
          <Btn name={Categories.TO_DO + ""} onClick={onClick}>
            To Do
          </Btn>
        )}
        {category !== Categories.DOING && (
          <Btn name={Categories.DOING + ""} onClick={onClick}>
            Doing
          </Btn>
        )}
        {category !== Categories.DONE && (
          <Btn name={Categories.DONE + ""} onClick={onClick}>
            Done
          </Btn>
        )}
        <Btn className="remove" onClick={onRemove}>
          delete
        </Btn>
      </span>
    </List>
  );
}
export default ToDo;
