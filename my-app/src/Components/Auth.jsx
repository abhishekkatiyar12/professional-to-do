import { useState } from "react";
import { Box, Input, Button, VStack, Heading, useToast } from "@chakra-ui/react";
import axios from "axios";

export default function AuthPage({ type, setUser, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    if (!email || !password) {
      return toast({
        title: "Missing fields",
        description: "Please enter both email and password.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    try {
      const url = type === "login"
        ? "https://professional-to-do.onrender.com/api/auth/login"
        : "https://professional-to-do.onrender.com/api/auth/register";

      const res = await axios.post(url, { email, password });

      if (type === "login") {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user); // store user info
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Registration successful",
          description: "Please login to continue.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setPage("login");
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={20} p={6} border="1px solid gray" borderRadius="md">
      <Heading mb={6} textAlign="center">{type === "login" ? "Login" : "Register"}</Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          colorScheme="blue"
          w="full"
          onClick={handleSubmit}
          isDisabled={!email || !password}
        >
          {type === "login" ? "Login" : "Register"}
        </Button>
      </VStack>
    </Box>
  );
}
