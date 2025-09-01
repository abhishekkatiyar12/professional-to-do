import { useRef } from "react";
import { Box, Input, Button, Heading, VStack, Link, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Login({ setUser }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      return toast({
        title: "Missing fields",
        description: "Please enter email and password",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard"); // redirect after login
    } catch (err) {
      toast({
        title: "Login failed",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={10} p={6} border="1px solid gray" borderRadius="md">
      <Heading mb={6}>Login</Heading>
      <VStack spacing={3}>
        <Input placeholder="Email" ref={emailRef} />
        <Input placeholder="Password" type="password" ref={passwordRef} />
        <Button colorScheme="blue" onClick={handleLogin} w="full">
          Login
        </Button>

        <Text fontSize="sm" color="gray.600">
          Forgot your password?{" "}
          <Link color="blue.500" onClick={() => navigate("/forgot-password")}>
            Reset here
          </Link>
        </Text>

        <Text fontSize="sm" color="gray.600">
          Don’t have an account?{" "}
          <Link color="green.500" onClick={() => navigate("/register")}>
            Register
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}
