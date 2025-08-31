import { VStack, Box, Text, Badge, HStack } from "@chakra-ui/react";

export default function CompletedList({ todos }) {
  if (todos.length === 0)
    return (
      <Text fontSize="md" color="gray.500" textAlign="center">
        No completed tasks yet 🎯
      </Text>
    );

  return (
    <VStack spacing={3} align="stretch">
      {todos.map((todo) => (
        <Box
          key={todo._id}
          p={4}
          borderRadius="md"
          borderWidth="1px"
          borderColor="green.300"
          bg="green.50"
          shadow="sm"
          _hover={{ shadow: "md" }}
        >
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={1}>
              <Text fontWeight="bold" fontSize="md">
                {todo.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Completed on: {new Date(todo.completedAt).toLocaleString()}
              </Text>
            </VStack>
            <Badge colorScheme="green" fontSize="0.8em">
              Completed
            </Badge>
          </HStack>
          <Text mt={2} fontSize="sm" color="gray.700">
            Due: {new Date(todo.dueDate).toLocaleDateString()}
          </Text>
        </Box>
      ))}
    </VStack>
  );
}
