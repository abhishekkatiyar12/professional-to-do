import { useState } from "react";
import {
  Box,
  Stack,
  Text,
  Input,
  Button,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  Heading,
} from "@chakra-ui/react";

export default function AddTodo({ addTodo, user }) {
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
    <Card shadow="lg" borderRadius="2xl" bg="white" px={6} py={4}>
      <CardBody>
        <Stack spacing={6}>
          {/* Greeting */}
          <Heading fontSize="lg" color="blue.600">
            👋 Hello, {user?.name || "User"}
          </Heading>

          {/* Inputs */}
          <Stack
            spacing={4}
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            flexWrap="wrap"
          >
            {/* Task Name */}
            <FormControl w={{ base: "100%", md: "250px" }}>
              <FormLabel fontSize="sm" fontWeight="medium">
                Task Name
              </FormLabel>
              <Input
                placeholder="Enter task name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="md"
              />
            </FormControl>

            {/* Due Date */}
            <FormControl w={{ base: "100%", md: "200px" }}>
              <FormLabel fontSize="sm" fontWeight="medium">
                Due Date
              </FormLabel>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                size="md"
              />
            </FormControl>

            {/* Due Time */}
            <FormControl w={{ base: "100%", md: "200px" }}>
              <FormLabel fontSize="sm" fontWeight="medium">
                Due Time
              </FormLabel>
              <Input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                size="md"
              />
            </FormControl>

            {/* Add Button */}
            <Box w={{ base: "100%", md: "150px" }} mt={{ base: 4, md: 6 }}>
              <Button
                colorScheme="blue"
                w="full"
                h="50px"
                fontSize="md"
                onClick={handleAdd}
                borderRadius="lg"
                _hover={{ transform: "scale(1.05)", boxShadow: "md" }}
                transition="all 0.2s"
              >
                ➕ Add Task
              </Button>
            </Box>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
}
