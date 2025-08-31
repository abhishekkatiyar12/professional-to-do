import { useState } from "react";
import { Box, Input, Button, Heading, VStack } from "@chakra-ui/react";
import API from "../utils/api";

export default function Register({ setUser, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async () => {
    try {
      const { data } = await API.post("/auth/register", { email, password, name, phone });
      alert("User registered successfully! Please login.");
      setPage("login"); // After registration → show login
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={10}>
      <Heading mb={6}>Register</Heading>
      <VStack spacing={3}>
        <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <Input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button colorScheme="green" onClick={handleRegister} w="full">Register</Button>
      </VStack>
    </Box>
  );
}
