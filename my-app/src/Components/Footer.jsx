import { Box, Text, Icon } from "@chakra-ui/react";
import { HiHeart } from "react-icons/hi";

export default function Footer() {
  return (
    <Box bg="gray.100" color="gray.700" textAlign="center" py={4} mt={10}>
      <Text>© 2025 Professional To-Do App. All rights reserved.</Text>
      <Text>
        Made with <Icon as={HiHeart} color="red.500" mx={1} boxSize={5}
        margin-top={1} /> by Abhishek
      </Text>
    </Box>
  );
}
