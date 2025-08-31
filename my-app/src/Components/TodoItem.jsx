import { HStack, Checkbox, IconButton, Text, VStack, Input, Button, Select, Box, Badge, Spacer } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CloseIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

export default function TodoItem({ todo, onComplete, onDelete, onUpdateTodo }) {
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  };

  const formatTime = (date) => {
    const d = new Date(date);
    return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
  };

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(todo.name);
  const [status, setStatus] = useState(todo.status);
  const [dueDate, setDueDate] = useState(formatDate(todo.dueDate));
  const [dueTime, setDueTime] = useState(formatTime(todo.dueDate));

  useEffect(() => {
    setName(todo.name);
    setStatus(todo.status);
    setDueDate(formatDate(todo.dueDate));
    setDueTime(formatTime(todo.dueDate));
  }, [todo]);

  const handleUpdate = () => {
    const updatedDue = new Date(dueDate);
    const [hours, minutes] = dueTime.split(":");
    updatedDue.setHours(hours, minutes, 0, 0);

    onUpdateTodo(todo._id, { name, status, dueDate: updatedDue });
    setIsEditing(false);
  };

  const bgColor = status === "completed" ? "green.50" 
                  : status === "deleted" ? "red.50" 
                  : "gray.50"; 

  return (
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      bg={bgColor}
      p={4}
      shadow="sm"
      _hover={{ shadow: "md" }}
    >
      <VStack align="stretch" spacing={2}>
        {/* Header with checkbox and action buttons */}
        <HStack spacing={2} justify="space-between" align="center">
          <Checkbox
            isChecked={status === "completed"}
            onChange={() => onComplete(todo._id)}
            flex="1"
          >
            <Text fontWeight="bold" fontSize={{ base: "14px", md: "16px" }}>
              {todo.name}
            </Text>
          </Checkbox>

          <HStack spacing={1}>
            <IconButton
              icon={isEditing ? <CloseIcon /> : <EditIcon />}
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              aria-label="Edit todo"
            />
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              size="sm"
              onClick={() => onDelete(todo._id)}
              aria-label="Delete todo"
            />
          </HStack>
        </HStack>

        {/* Created date */}
        <Text fontSize="sm" color="gray.500">Created: {new Date(todo.createdAt).toLocaleString()}</Text>

        {/* Edit mode */}
        {isEditing ? (
          <VStack align="stretch" spacing={2}>
            <Input
              value={name}
              size="sm"
              placeholder="Task name"
              onChange={(e) => setName(e.target.value)}
            />
            <Select value={status} size="sm" onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="deleted">Deleted</option>
            </Select>
            <HStack spacing={2} wrap="wrap">
              <Input
                type="date"
                value={dueDate}
                size="sm"
                onChange={(e) => setDueDate(e.target.value)}
              />
              <Input
                type="time"
                value={dueTime}
                size="sm"
                onChange={(e) => setDueTime(e.target.value)}
              />
            </HStack>
            <Button size="sm" colorScheme="blue" onClick={handleUpdate}>
              Update
            </Button>
          </VStack>
        ) : (
          // View mode
          <HStack justify="space-between" wrap="wrap">
            <Text fontSize={{ base: "14px", md: "15px" }}>Due: {new Date(todo.dueDate).toLocaleString()}</Text>
            <HStack spacing={2}>
              {status === "completed" && <Badge colorScheme="green">Completed</Badge>}
              {status === "deleted" && <Badge colorScheme="red">Deleted</Badge>}
            </HStack>
          </HStack>
        )}
      </VStack>
    </Box>
  );
}
