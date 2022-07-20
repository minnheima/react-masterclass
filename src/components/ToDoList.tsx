import { useRecoilValue } from "recoil";
import { toDoState } from "../atom";
import CreateToDo from "./CreatToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState); // setter함수가 필요하지 않기때문에 useRecoilValue로 변경

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
