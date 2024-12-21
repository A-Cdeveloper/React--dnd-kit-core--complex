//import { useState } from "react";

import { useState } from "react";
import Person from "./components/Person";
import { PersonType } from "./types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";

const PERSONS: PersonType[] = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 29,
    email: "alice.johnson@example.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 34,
    email: "bob.smith@example.com",
    phone: "234-567-8901",
  },
  {
    id: 3,
    name: "Catherine Green",
    age: 22,
    email: "catherine.green@example.com",
    phone: "345-678-9012",
  },
  {
    id: 4,
    name: "David Brown",
    age: 41,
    email: "david.brown@example.com",
    phone: "456-789-0123",
  },
  {
    id: 5,
    name: "Ella White",
    age: 27,
    email: "ella.white@example.com",
    phone: "567-890-1234",
  },
  {
    id: 6,
    name: "Frank Harris",
    age: 38,
    email: "frank.harris@example.com",
    phone: "678-901-2345",
  },
  {
    id: 7,
    name: "Grace Miller",
    age: 25,
    email: "grace.miller@example.com",
    phone: "789-012-3456",
  },
  {
    id: 8,
    name: "Henry Wilson",
    age: 30,
    email: "henry.wilson@example.com",
    phone: "890-123-4567",
  },
  {
    id: 9,
    name: "Isabella Moore",
    age: 24,
    email: "isabella.moore@example.com",
    phone: "901-234-5678",
  },
  {
    id: 10,
    name: "Jack Taylor",
    age: 37,
    email: "jack.taylor@example.com",
    phone: "012-345-6789",
  },
  {
    id: 11,
    name: "Karen Anderson",
    age: 28,
    email: "karen.anderson@example.com",
    phone: "123-456-7890",
  },
  {
    id: 12,
    name: "Liam Thomas",
    age: 31,
    email: "liam.thomas@example.com",
    phone: "234-567-8901",
  },
  {
    id: 13,
    name: "Mia Martinez",
    age: 26,
    email: "mia.martinez@example.com",
    phone: "345-678-9012",
  },
  {
    id: 14,
    name: "Noah Garcia",
    age: 33,
    email: "noah.garcia@example.com",
    phone: "456-789-0123",
  },
  {
    id: 15,
    name: "Olivia Lee",
    age: 21,
    email: "olivia.lee@example.com",
    phone: "567-890-1234",
  },
];

export default function App() {
  const [persons, setPersons] = useState<PersonType[]>(PERSONS);
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(+event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPersons((prev) => {
        const oldIndex = prev.findIndex((person) => person.id === active.id);
        const newIndex = prev.findIndex((person) => person.id === over.id);

        // Move the item to the start of the target's position
        const updated = [...prev];
        const [movedItem] = updated.splice(oldIndex, 1);
        updated.splice(newIndex, 0, movedItem); // Insert at the target's position
        return updated;
      });
    }

    setActiveId(null); // Clear active drag state
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="container max-w-2xl mx-auto">
        {persons.map((person) =>
          person.id === activeId ? null : (
            <Person key={person.id} person={person} />
          )
        )}
      </div>
      <DragOverlay>
        {activeId ? (
          <div className="bg-slate-500 bg-opacity-50">
            {persons.find((person) => person.id === activeId) && (
              <Person
                person={persons.find((person) => person.id === activeId)!}
              />
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
