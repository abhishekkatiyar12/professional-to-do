import { useState } from "react";
import { Stack, HStack, Input, Button, InputGroup, InputLeftAddon } from "@chakra-ui/react";

export default function AddTodo({ addTodo }) {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("00:00");

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
    <Stack
      spacing={4}
      direction={{ base: "column", md: "row" }} // stack on mobile, row on md+
      align="center"
    >
      {/* Task Name Input */}
      <Input
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        size={{ base: "md", md: "lg" }}
        w={{ base: "100%", md: "250px" }}
        fontSize={{ base: "14px", md: "16px" }}
      />

      {/* Due Date Input */}
      <InputGroup w={{ base: "100%", md: "200px" }}>
        <InputLeftAddon children="Due Date" fontSize={{ base: "14px", md: "16px" }} />
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          size={{ base: "md", md: "lg" }}
          fontSize={{ base: "14px", md: "16px" }}
        />
      </InputGroup>

      {/* Due Time Input */}
      <InputGroup w={{ base: "100%", md: "200px" }}>
        <InputLeftAddon children="Due Time" fontSize={{ base: "14px", md: "16px" }}/>
        <Input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          size={{ base: "md", md: "lg" }}
          fontSize={{ base: "14px", md: "16px" }}
        />
      </InputGroup>

      {/* Add Button */}
      <Button
        colorScheme="blue"
        onClick={handleAdd}
        w={{ base: "100%", md: "120px" }}
        h={{ base: "40px", md: "50px" }}
        fontSize={{ base: "14px", md: "16px" }}
      >
        Add
      </Button>
    </Stack>
  );
}
