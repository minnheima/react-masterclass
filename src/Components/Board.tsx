import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
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
  padding: 20px;
  border-radius: inherit;
  transition: background-color 0.2s ease-in-out;
  background-color: ${(props) => (props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThisWith ? "#b2bec3" : "transparent")};
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThisWith: boolean;
}

interface IBoardProps {
  toDos: string[];
  boardId: string;
}
// Boolean() will just convert to true/false.   - line 46
function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThisWith={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} index={index} toDo={toDo} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
