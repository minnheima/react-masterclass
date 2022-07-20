import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IForm {
  toDo: string;
}
interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE"; //모든 string이 아니라 이 셋 중에 하나
}

// TypeScript는 toDos가 여기의 IToDo 객체로 이뤄진 배열임을 안다
const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState); //toDos와 setter함수 모두 리턴

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    // console.log("add to do", data.toDo);
    setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category: "TO_DO" }, ...oldToDos]); // []에 oldToDo의 요소들을 넣어 반환
    setValue("toDo", "");
  };
  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
      </form>
      <button>Add</button>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
