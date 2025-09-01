import { useState } from "react";
import { Box, Input, Button, Heading, Text, VStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your registered email.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Something went wrong.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        setMessage(data.message || "If your email is registered, a reset link has been sent.");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Network Error",
        description: "Unable to send reset link. Try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt={10}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      bg="white"
    >
      <Heading size="md" mb={6} textAlign="center">
        Forgot Password
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            colorScheme="blue"
            type="submit"
            w="full"
            isLoading={loading}
            loadingText="Sending..."
          >
            Send Reset Link
          </Button>
        </VStack>
      </form>

      {message && (
        <Text mt={4} color="green.500" textAlign="center">
          {message}
        </Text>
      )}

      <Button
        mt={4}
        variant="link"
        colorScheme="blue"
        w="full"
        onClick={() => navigate("/login")}
      >
        Back to Login
      </Button>
    </Box>
  );
}
