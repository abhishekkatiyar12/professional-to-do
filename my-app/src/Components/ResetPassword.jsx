import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Button,
  Heading,
  VStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import API from "../utils/api"; // using axios instance

export default function ResetPassword() {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const toast = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast({
        title: "Missing Fields",
        description: "Please enter both password fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!token) {
      toast({
        title: "Invalid Link",
        description: "Reset token is missing or invalid.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      // Use API instance
      const { data } = await API.post(`/auth/resetpassword/${token}`, { password });

      toast({
        title: "Password Reset",
        description: data.message || "Your password has been reset successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error(err);
      toast({
        title: "Reset Failed",
        description: err.response?.data?.message || err.message || "Something went wrong",
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
    >
      <Heading size="md" mb={4}>
        Reset Password
      </Heading>
      <form onSubmit={handleReset}>
        <VStack spacing={4}>
          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            colorScheme="green"
            type="submit"
            w="full"
            isDisabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Reset Password"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
