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
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import API from "../utils/api";

export default function Header({ user, setUser, handleLogout }) {
  const [profile, setProfile] = useState(null);
  const [editProfile, setEditProfile] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const res = await API.get("/auth/profile");
        setProfile(res.data);
        setEditProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [user]);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setProfile(null);
    setUser(null);
    handleLogout();
  };

  const handleUpdate = async () => {
    try {
      const res = await API.put("/auth/profile", editProfile);
      setProfile(res.data.user);
      setUser(res.data.user);
      toast({
        title: "Profile Updated",
        description: "Changes saved successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      toast({
        title: "Update Failed",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="blue.600" color="white" px={6} py={4} shadow="md">
      <HStack>
        <Heading size="md">📝 Professional To-Do App</Heading>
        <Spacer />
        {!user ? (
          <>
            <Button as={Link} to="/register" colorScheme="black" variant="outline">
              Register
            </Button>
            <Button as={Link} to="/login" colorScheme="black" variant="outline">
              Login
            </Button>
          </>
        ) : (
          <>
            <Button colorScheme="black" variant="outline" onClick={onOpen}>
              Profile
            </Button>
            <Button colorScheme="red" variant="outline" onClick={handleLogoutClick}>
              Logout
            </Button>
          </>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>👤 User Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {profile ? (
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={editProfile.name || ""}
                    onChange={(e) =>
                      setEditProfile({ ...editProfile, name: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input value={profile.email} isReadOnly />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    value={editProfile.phone || ""}
                    onChange={(e) =>
                      setEditProfile({ ...editProfile, phone: e.target.value })
                    }
                  />
                </FormControl>
                <Text fontSize="sm" color="gray.500">
                  Joined: {new Date(profile.createdAt).toLocaleDateString()}
                </Text>
                <HStack justify="flex-end" pt={2}>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button colorScheme="blue" onClick={handleUpdate}>
                    Save Changes
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <Text>Loading profile...</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
