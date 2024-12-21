import { useDraggable, useDroppable } from "@dnd-kit/core";
import { PersonType } from "../types";

const Person = ({ person }: { person: PersonType }) => {
  const {
    setNodeRef: setNodeRefDraggable,
    listeners,
    attributes,
    transform,
  } = useDraggable({
    id: person.id,
  });

  const { setNodeRef: setNodeRefDroppable } = useDroppable({
    id: person.id,
  });

  return (
    <div className="border-b border-primary-500/20 py-2">
      <div
        className="grid grid-cols-[15px_200px_30px_250px_1fr] gap-6 cursor-grabbing"
        ref={(node) => {
          setNodeRefDraggable(node);
          setNodeRefDroppable(node);
        }}
        style={{
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
          transition: transform ? "none" : "transform 200ms ease",
        }}
      >
        {/* Drag handle */}
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab text-primary hover:text-primary-dark"
        >
          ⠿ {/* Drag handle icon */}
        </div>
        <div>{person.name}</div>
        <div className="text-secondary">{person.age}</div>
        <div className="text-secondary">{person.email}</div>
        <div className="text-secondary">{person.phone}</div>
      </div>
    </div>
  );
};

export default Person;
