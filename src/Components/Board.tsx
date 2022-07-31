import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { ITodo, toDoState } from "../atom";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  width: 300px;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
//  isDraggingOver : 현재 선택한 draggable이 dragging되고 있는지 여부확인, draggingFromThisWith: 현재 droppable에서 벗어난 draggableId(string) -> Boolean() 이용
const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  margin-top: 10px;
  padding: 20px;
  border-radius: inherit;
  transition: background-color 0.2s ease-in-out;
  background-color: ${(props) => (props.isDraggingOver ? "#e9e4df" : props.isDraggingFromThisWith ? "#b2bec3" : "transparent")};
`;
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    height: 35px;
    border: none;
  }
`;
interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThisWith: boolean;
}
interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}
interface IForm {
  toDo: string;
}

// Boolean() will just convert to true/false.   - line 46
function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newTodo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", { required: true })} type="text" placeholder={`Add task on ${boardId}`} />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThisWith={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
