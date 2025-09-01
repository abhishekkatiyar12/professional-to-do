import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      textAlign="center"
      mt={{ base: 16, md: 24 }}
      px={{ base: 4, md: 0 }}
    >
      <Heading mb={6} fontSize={{ base: "2xl", md: "4xl" }}>
        📝 Welcome to Professional To-Do App
      </Heading>
      <Text fontSize={{ base: "md", md: "lg" }} mb={10} color="gray.600">
        Manage your tasks efficiently and never miss a deadline!
      </Text>

      <VStack spacing={4}>
        <Button
          colorScheme="green"
          onClick={() => navigate("/register")}
          w={{ base: "100%", md: "200px" }}
          size="lg"
          boxShadow="md"
          _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
          transition="all 0.2s"
        >
          Register
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => navigate("/login")}
          w={{ base: "100%", md: "200px" }}
          size="lg"
          boxShadow="md"
          _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
          transition="all 0.2s"
        >
          Login
        </Button>
      </VStack>
    </Box>
  );
}
