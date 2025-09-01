import { VStack, Box, Text, Badge, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function CompletedList({ todos }) {
  if (!todos.length)
    return (
      <Text fontSize="md" color="gray.500" textAlign="center">
        No completed tasks yet 🎯
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
          borderColor="green.300"
          bg="green.50"
          shadow="sm"
          _hover={{ shadow: "md" }}
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            spacing={{ base: 3, md: 0 }}
          >
            <VStack align="start" spacing={1} flex="1">
              <Link to={`/todo/${todo._id}`}>
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "md", md: "lg" }}
                  isTruncated
                >
                  {todo.name}
                </Text>
              </Link>
              {todo.description && (
                <Text fontSize="sm" color="gray.700" isTruncated>
                  {todo.description}
                </Text>
              )}
              <Text fontSize="sm" color="gray.600">
                Due:{" "}
                {new Date(todo.dueDate).toLocaleString([], {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Completed on:{" "}
                {new Date(todo.completedAt).toLocaleString([], {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </Text>
            </VStack>

            <Badge
              colorScheme="green"
              fontSize="0.8em"
              alignSelf={{ base: "flex-start", md: "center" }}
            >
              Completed
            </Badge>
          </Stack>
        </Box>
      ))}
    </VStack>
  );
}
