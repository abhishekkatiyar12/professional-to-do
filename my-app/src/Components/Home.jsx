import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";

export default function Home({ setPage }) {
  return (
    <Box textAlign="center" mt={20}>
      <Heading mb={6}>📝 Welcome to Professional To-Do App</Heading>
      <Text fontSize="lg" mb={8}>
        Manage your tasks efficiently and never miss a deadline!
      </Text>
      <VStack spacing={4}>
        <Button colorScheme="green" onClick={() => setPage("register")} w="200px">
          Register
        </Button>
        <Button colorScheme="blue" onClick={() => setPage("login")} w="200px">
          Login
        </Button>
      </VStack>
    </Box>
  );
}
