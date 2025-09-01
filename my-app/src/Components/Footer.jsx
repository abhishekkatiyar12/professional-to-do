import { Box, Text, Icon, HStack, Link } from "@chakra-ui/react";
import { HiHeart } from "react-icons/hi";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Footer() {
  return (
    <Box bg="gray.100" color="gray.700" textAlign="center" py={6} mt={10} shadow="sm">
      {/* Copyright */}
      <Text fontSize="sm">© {new Date().getFullYear()} Professional To-Do App. All rights reserved.</Text>

      {/* Made with love */}
      <Text
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="md"
        mt={1}
      >
        Made with <Icon as={HiHeart} color="red.500" mx={1} boxSize={5} /> by{" "}
        <Text as="span" fontWeight="bold" color="blue.600" ml={1}>
          Abhishek 🚀
        </Text>
      </Text>

      {/* Social Links */}
      <HStack spacing={6} justify="center" mt={4}>
        <Link href="https://www.linkedin.com/in/contactabhishekk/" isExternal>
          <Icon
            as={FaLinkedin}
            boxSize={6}
            transition="all 0.3s"
            _hover={{ color: "blue.600", transform: "scale(1.2)" }}
          />
        </Link>
        <Link href="https://www.instagram.com/yourusername" isExternal>
          <Icon
            as={FaInstagram}
            boxSize={6}
            transition="all 0.3s"
            _hover={{ color: "pink.500", transform: "scale(1.2)" }}
          />
        </Link>
        <Link href="https://leetcode.com/u/abhishekkatiyar1203/" isExternal>
          <Icon
            as={SiLeetcode}
            boxSize={6}
            transition="all 0.3s"
            _hover={{ color: "orange.500", transform: "scale(1.2)" }}
          />
        </Link>
      </HStack>

      {/* Motivational Tagline */}
      <Text fontSize="xs" mt={3} color="gray.500">
        💡 Keep coding, keep growing — one task at a time.
      </Text>
    </Box>
  );
}
