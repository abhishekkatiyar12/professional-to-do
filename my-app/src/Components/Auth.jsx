import { useState } from "react";
import { Box, Input, Button, VStack, Heading, Text } from "@chakra-ui/react";
import axios from "axios";

export default function AuthPage({ type, setUser, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const url = type === "login"
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const res = await axios.post(url, { email, password });

      if (type === "login") {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user); // store user info
      } else {
        alert("Registration successful! Please login.");
        setPage("login");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={20} p={6} border="1px solid gray" borderRadius="md">
      <Heading mb={6} textAlign="center">{type === "login" ? "Login" : "Register"}</Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="blue" w="full" onClick={handleSubmit}>
          {type === "login" ? "Login" : "Register"}
        </Button>
      </VStack>
    </Box>
  );
}
