import { Box, HStack, VStack, Stack, Button, Heading, Spacer } from "@chakra-ui/react";

export default function Header({ user, setPage, handleLogout }) {
  return (
    <Box bg="blue.600" color="white" px={6} py={4} >
      <Stack
        direction={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        spacing={{ base: 4, md: 6 }}
      >
        <Heading size="md">📝 Professional To-Do App</Heading>

        <Spacer /> {/* Works only in row direction */}

        <HStack spacing={3} width={{ base: "100%", md: "auto" }} justify={{ base: "flex-start", md: "flex-end" }}>
          {!user && (
            <>
              <Button
                colorScheme="green"
                backgroundColor="black"
                variant="outline"
                onClick={() => setPage("register")}
                size="sm"
              >
                Register
              </Button>
              <Button
                colorScheme="blue"
                backgroundColor="black"
                variant="outline"
                onClick={() => setPage("login")}
                size="sm"
              >
                Login
              </Button>
            </>
          )}
          {user && (
            <Button
              colorScheme="red"
              backgroundColor="black"
              variant="outline"
              onClick={handleLogout}
              size="sm"
            >
              Logout
            </Button>
          )}
        </HStack>
      </Stack>
    </Box>
  );
}
