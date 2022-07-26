import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState, TODO_LIST } from "../atom";
import styled from "styled-components";

const Form = styled.form`
  display: inline-block;
  margin-bottom: 20px;
  input {
    width: 200px;
    height: 30px;
  }
`;
const Btn = styled.button`
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0 5px;
  padding: 7px 10px;
  border-radius: 5px;
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    // setToDos((prevToDos) => [{ text: toDo, id: Date.now(), category }, ...prevToDos]); // []에 prevToDos의 요소들을 넣어 반환
    setToDos((prevToDos) => {
      const addToDo = [{ text: toDo, id: Date.now(), category }, ...prevToDos];
      localStorage.setItem(TODO_LIST, JSON.stringify(addToDo));
      return addToDo;
    });
    setValue("toDo", "");
  };
  console.log(toDos); //[{...}]
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <Btn>Add</Btn>
    </Form>
  );
}
export default CreateToDo;
