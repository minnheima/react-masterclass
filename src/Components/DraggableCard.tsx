import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  margin-bottom: 5px;
`;
interface IDragabbleCardProps {
  toDo: string;
  index: number;
}

function DragabbleCard({ toDo, index }: IDragabbleCardProps) {
  console.log(toDo, "has been rendered");
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic) => (
        <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

// React.memo rerenders only the changed cards.
export default React.memo(DragabbleCard);
