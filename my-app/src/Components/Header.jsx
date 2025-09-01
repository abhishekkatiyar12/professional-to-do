import { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Button,
  Heading,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import API from "../utils/api"; // use the axios instance

export default function Header({ user, setPage, handleLogout }) {
  const [profile, setProfile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const res = await API.get("/auth/profile"); // API instance handles baseURL + token
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [user]);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setProfile(null);
    handleLogout();
  };

  return (
    <Box bg="blue.600" color="white" px={6} py={4}>
      <HStack>
        <Heading size="md">📝 Professional To-Do App</Heading>
        <Spacer />

        {!user ? (
          <>
            <Button
              colorScheme="green"
              backgroundColor="black"
              variant="outline"
              onClick={() => setPage("register")}
            >
              Register
            </Button>
            <Button
              colorScheme="blue"
              backgroundColor="black"
              variant="outline"
              onClick={() => setPage("login")}
            >
              Login
            </Button>
          </>
        ) : (
          <>
            <Button
              colorScheme="purple"
              backgroundColor="black"
              variant="outline"
              onClick={onOpen}
            >
              Profile
            </Button>
            <Button
              colorScheme="red"
              backgroundColor="black"
              variant="outline"
              onClick={handleLogoutClick}
            >
              Logout
            </Button>
          </>
        )}
      </HStack>

      {/* Profile Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {profile ? (
              <>
                <Text>
                  <strong>Name:</strong> {profile.name}
                </Text>
                <Text>
                  <strong>Email:</strong> {profile.email}
                </Text>
                <Text>
                  <strong>Phone:</strong> {profile.phone || "N/A"}
                </Text>
                <Text>
                  <strong>Created At:</strong>{" "}
                  {new Date(profile.createdAt).toLocaleString()}
                </Text>
              </>
            ) : (
              <Text>Loading profile...</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
