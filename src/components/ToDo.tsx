import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atom";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDos((oldToDos) => {
      const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any }; // {text, id, category: name as IToDo["category"]}이렇게 작성해도 됨

      return [...oldToDos.slice(0, targetIdx), newToDo, ...oldToDos.slice(targetIdx + 1)];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO + ""} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING + ""} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE + ""} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
