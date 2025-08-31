import { useState } from "react";
import { HStack, Input, Button } from "@chakra-ui/react";

export default function AddTodo({ addTodo }) {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const handleAdd = () => {
    if (!name || !dueDate || !dueTime)
      return alert("Please provide task name, due date, and due time");

    const dueDateTime = new Date(dueDate);
    const [hours, minutes] = dueTime.split(":");
    dueDateTime.setHours(hours, minutes, 0, 0);

    const newTodo = {
      name,
      dueDate: dueDateTime,
      status: "pending",
      createdAt: new Date(),
    };

    addTodo(newTodo);
    setName("");
    setDueDate("");
    setDueTime("");
  };

  return (
    <HStack spacing={2}>
      <Input
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <Input
        type="time"
        value={dueTime}
        onChange={(e) => setDueTime(e.target.value)}
      />
      <Button colorScheme="blue" onClick={handleAdd}>
        Add
      </Button>
    </HStack>
  );
}
