import { useState } from "react";
import { Box, Input, Button, Heading, VStack } from "@chakra-ui/react";
import API from "../utils/api";

export default function Login({ setUser, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={10}>
      <Heading mb={6}>Login</Heading>
      <VStack spacing={3}>
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button colorScheme="blue" onClick={handleLogin} w="full">Login</Button>
      </VStack>
    </Box>
  );
}
