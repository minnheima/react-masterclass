import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const TrashBin = styled.div<ITrashProps>`
  margin-top: 40px;
  justify-content: center;
  padding: 20px;
  border: 3px solid #636e72;
  border-radius: 5px;
  text-align: center;
`;
interface ITrashProps {
  isDraggingFromThisWith: boolean;
  isDraggingOver: boolean;
}
function Trash() {
  return (
    <>
      <Droppable droppableId="trash">
        {(provided, snapshot) => (
          <TrashBin
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
          >
            trash
            {provided.placeholder}
          </TrashBin>
        )}
      </Droppable>
    </>
  );
}

export default Trash;
