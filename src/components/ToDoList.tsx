import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;
const Content = styled.div`
  width: 100%;
  text-align: center;
`;

const Select = styled.select`
  display: inline-block;
  width: 150px;
  height: 30px;
  margin-right: 10px;
`;
const TodoWrap = styled.ul`
  width: 50vw;
  margin: 0 auto;
  border-radius: 5px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.2);
`;
function ToDoList() {
  // const toDos = useRecoilValue(toDoState); // setter함수가 필요하지 않기때문에 useRecoilValue로 변경
  const toDos = useRecoilValue(toDoSelector);

  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as any);
  };
  // console.log(category);
  return (
    <Content>
      <Title>To Do List</Title>
      <hr />
      <Select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </Select>
      <CreateToDo />
      <TodoWrap>
        {toDos.length === 0 ? <span>Thers is nothing to do!</span> : null}
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </TodoWrap>
    </Content>
  );
}
export default ToDoList;
