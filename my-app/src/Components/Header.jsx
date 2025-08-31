import { Box, HStack, Button, Heading, Spacer } from "@chakra-ui/react";

export default function Header({ user, setPage, handleLogout }) {
  return (
    <Box bg="blue.600" color="white" px={6} py={4}>
      <HStack>
        <Heading size="md">📝 Professional To-Do App</Heading>
        <Spacer />
        {!user && (
          <>
            <Button colorScheme="green" backgroundColor={"black"} variant="outline" onClick={() => setPage("register")}>
              Register
            </Button>
            <Button colorScheme="blue" backgroundColor={"black"} variant="outline" onClick={() => setPage("login")}>
              Login
            </Button>
          </>
        )}
        {user && (
          <Button colorScheme="red" backgroundColor={"black"} variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </HStack>
    </Box>
  );
}
