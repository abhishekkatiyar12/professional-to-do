import { useState } from "react";
import { Box, Input, Button, Heading, VStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password || !phone) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const { data } = await API.post("/auth/register", { email, password, name, phone });
      toast({
        title: "Registration Successful",
        description: "Please login to continue.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login"); // Navigate to login page
    } catch (err) {
      toast({
        title: "Registration Failed",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={10} p={6} border="1px solid gray" borderRadius="md">
      <Heading mb={6}>Register</Heading>
      <VStack spacing={3}>
        <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <Input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button colorScheme="green" onClick={handleRegister} w="full">
          Register
        </Button>
      </VStack>
    </Box>
  );
}
