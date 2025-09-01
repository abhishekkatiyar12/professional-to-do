import { useRef } from "react";
import {
  Box,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function AddTodo({ addTodo, user }) {
  const nameRef = useRef();
  const dueDateRef = useRef();
  const dueTimeRef = useRef();
  const descriptionRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  // Redirect to login if user is not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  const today = new Date().toISOString().split("T")[0];

  const handleAdd = () => {
    const name = nameRef.current.value.trim();
    const dueDate = dueDateRef.current.value;
    const dueTime = dueTimeRef.current.value;
    const description = descriptionRef.current.value.trim();

    if (!name || !dueDate || !dueTime) {
      return toast({
        title: "Missing fields",
        description: "Please provide task name, due date, and due time",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    const dueDateTime = new Date(dueDate);
    const [hours, minutes] = dueTime.split(":");
    dueDateTime.setHours(hours, minutes, 0, 0);

    if (dueDateTime < new Date()) {
      return toast({
        title: "Invalid date/time",
        description: "Due date and time must be in the future.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    const newTodo = {
      name,
      dueDate: dueDateTime,
      description,
      status: "pending",
      createdAt: new Date(),
    };

    addTodo(newTodo);

    // Clear inputs
    nameRef.current.value = "";
    dueDateRef.current.value = today;
    dueTimeRef.current.value = new Date().toTimeString().slice(0, 5);
    descriptionRef.current.value = "";

    toast({
      title: "Task added",
      description: `${name} has been added successfully`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Card shadow="lg" borderRadius="2xl" bg="white" px={6} py={4}>
      <CardBody>
        <Stack spacing={6}>
          <Heading fontSize="lg" color="blue.600">
            👋 Hello, {user?.name || "User"}
          </Heading>

          <Stack
            spacing={4}
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            flexWrap="wrap"
          >
            <FormControl w={{ base: "100%", md: "250px" }}>
              <FormLabel fontSize="sm" fontWeight="medium">Task Name</FormLabel>
              <Input placeholder="Enter task name" ref={nameRef} size="md" />
            </FormControl>

            <FormControl w={{ base: "100%", md: "200px" }}>
              <FormLabel fontSize="sm" fontWeight="medium">Due Date</FormLabel>
              <Input type="date" ref={dueDateRef} min={today} size="md" defaultValue={today} />
            </FormControl>

            <FormControl w={{ base: "100%", md: "200px" }}>
              <FormLabel fontSize="sm" fontWeight="medium">Due Time</FormLabel>
              <Input
                type="time"
                defaultValue={new Date().toTimeString().slice(0, 5)}
                ref={dueTimeRef}
                size="md"
              />
            </FormControl>

            <FormControl w={{ base: "100%", md: "500px" }}>
              <FormLabel fontSize="sm" fontWeight="medium">Description</FormLabel>
              <Input
                placeholder="Enter description or links"
                ref={descriptionRef}
                size="md"
              />
            </FormControl>

            <Box w={{ base: "100%", md: "150px" }} mt={{ base: 4, md: 6 }}>
              <Button
                colorScheme="blue"
                w="full"
                h="50px"
                fontSize="md"
                onClick={handleAdd}
                borderRadius="lg"
                _hover={{ transform: "scale(1.05)", boxShadow: "md" }}
                transition="all 0.2s"
              >
                ➕ Add Task
              </Button>
            </Box>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
}
