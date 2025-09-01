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
import API from "../utils/api"; // axios instance

export default function Header({ user, setUser, setPage, handleLogout}) {
  const [profile, setProfile] = useState(null);
  const [editProfile, setEditProfile] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
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
      console.log("trying to update the profile");
      console.log(editProfile)
      const res = await API.put("/auth/profile", editProfile);
      console.log(res);
      setProfile(res.data.user);
      setUser(res.data.user); // 🔥 Update parent state so AddTodo reflects new name

      toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      console.error("Error updating profile:", err);
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
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => setPage("register")}
            >
              Register
            </Button>
            <Button
              colorScheme="yellow"
              variant="outline"
              onClick={() => setPage("login")}
            >
              Login
            </Button>
          </>
        ) : (
          <>
            <Button colorScheme="black" variant="outline" onClick={onOpen}>
              Profile
            </Button>
            <Button
              colorScheme="red"
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
          <ModalHeader>👤 User Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {profile ? (
              <VStack spacing={4} align="stretch">
                {/* Name */}
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={editProfile.name || ""}
                    onChange={(e) =>
                      setEditProfile({ ...editProfile, name: e.target.value })
                    }
                  />
                </FormControl>

                {/* Email (non-editable) */}
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input value={profile.email} isReadOnly />
                </FormControl>

                {/* Phone */}
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    value={editProfile.phone || ""}
                    onChange={(e) =>
                      setEditProfile({ ...editProfile, phone: e.target.value })
                    }
                  />
                </FormControl>

                {/* Created At */}
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
