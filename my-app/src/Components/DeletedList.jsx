import { VStack, Box, Text, Badge, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function DeletedList({ todos, onRestore }) {
  if (!todos.length)
    return (
      <Text fontSize="md" color="gray.500" textAlign="center">
        No deleted tasks 🗑️
      </Text>
    );

  return (
    <VStack spacing={4} align="stretch">
      {todos.map((todo) => (
        <Box
          key={todo._id}
          p={{ base: 4, md: 5 }}
          borderRadius="md"
          borderWidth="1px"
          borderColor="red.300"
          bg="red.50"
          shadow="sm"
          _hover={{ shadow: "md" }}
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            spacing={{ base: 3, md: 0 }}
          >
            {/* Task Details */}
            <VStack align="start" spacing={1} flex="1">
              <Link to={`/todo/${todo._id}`}>
                <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }} isTruncated>
                  {todo.name}
                </Text>
              </Link>

              {todo.description && (
                <Text fontSize="sm" color="gray.700" isTruncated>
                  {todo.description}
                </Text>
              )}

              <Text fontSize="sm" color="gray.600">
                Created:{" "}
                {new Date(todo.createdAt).toLocaleString([], {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </Text>

              {todo.deletedAt && (
                <Text fontSize="sm" color="gray.600">
                  Deleted:{" "}
                  {new Date(todo.deletedAt).toLocaleString([], {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </Text>
              )}

              <Text fontSize="sm" color="gray.600">
                Due:{" "}
                {new Date(todo.dueDate).toLocaleString([], {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </Text>
            </VStack>

            {/* Badge + Restore Button */}
            <VStack align={{ base: "stretch", md: "end" }} spacing={2} mt={{ base: 2, md: 0 }}>
              <Badge colorScheme="red" fontSize="0.8em">
                Deleted
              </Badge>
              <Button size="sm" colorScheme="green" onClick={() => onRestore(todo._id)}>
                Restore
              </Button>
            </VStack>
          </Stack>
        </Box>
      ))}
    </VStack>
  );
}
