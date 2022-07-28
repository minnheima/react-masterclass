import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div<{ isDragging: boolean }>`
  padding: 10px;
  background-color: ${(props) => (props.isDragging ? "#74b9ff" : props.theme.cardColor)};
  border-radius: 5px;
  margin-bottom: 5px;
  box-shadow: ${(props) => (props.isDragging ? "0px 2px 5px rgba(0,0,0,0.3)" : "none")};
`;
interface IDragabbleCardProps {
  toDo: string;
  index: number;
}

function DragabbleCard({ toDo, index }: IDragabbleCardProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic, info) => (
        <Card isDragging={info.isDragging} ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

// React.memo rerenders only the changed cards.
export default React.memo(DragabbleCard);
