import { VStack, Box, Text, Badge, Button, Stack } from "@chakra-ui/react";

export default function DeletedList({ todos, onRestore }) {
  if (todos.length === 0)
    return (
      <Text fontSize="md" color="gray.500" textAlign="center">
        No deleted tasks 🗑️
      </Text>
    );

  return (
    <VStack spacing={3} align="stretch">
      {todos.map((todo) => (
        <Box
          key={todo._id}
          p={{ base: 3, md: 4 }}
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
            align={{ base: "stretch", md: "center" }}
            spacing={{ base: 3, md: 0 }}
          >
            {/* Task Details */}
            <VStack align="start" spacing={1} flex="1">
              <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
                {todo.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Created: {new Date(todo.createdAt).toLocaleString()}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Deleted: {new Date(todo.deletedAt).toLocaleString()}
              </Text>
              <Text fontSize="sm" color="gray.700">
                Due: {new Date(todo.dueDate).toLocaleDateString()}
              </Text>
            </VStack>

            {/* Restore Button */}
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
