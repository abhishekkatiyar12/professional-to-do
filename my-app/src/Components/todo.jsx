import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  ButtonGroup,
  Button,
  Spinner,
  Text,
  ChakraProvider,
  Stack,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import CompletedList from "./CompletedList";
import DeletedList from "./DeletedList";
import theme from "../theme";
import { isToday, isTomorrow, isOverdue } from "../utils/dateUtils";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://professional-to-do.onrender.com/api/todos",
          axiosConfig
        );
        setTodos(res.data.todos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // Fetch logged-in user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://professional-to-do.onrender.com/api/auth/profile",
          axiosConfig
        );
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    if (token) fetchUser();
  }, [token]);

  const addTodo = async (todo) => {
    try {
      const res = await axios.post(
        "https://professional-to-do.onrender.com/api/todos",
        todo,
        axiosConfig
      );
      setTodos([res.data.todo, ...todos]);
    } catch (err) {
      console.error("Error adding todo:", err.response?.data || err.message);
    }
  };

  const completeTodo = async (id) => {
    try {
      const res = await axios.put(
        `https://professional-to-do.onrender.com/api/todos/${id}`,
        { status: "completed", completedAt: new Date().toISOString() },
        axiosConfig
      );
      setTodos(todos.map((t) => (t._id === id ? res.data.todo : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(
        `https://professional-to-do.onrender.com/api/todos/${id}`,
        axiosConfig
      );
      setTodos(todos.map((t) => (t._id === id ? res.data.todo : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const restoreTodo = async (id) => {
    try {
      const res = await axios.put(
        `https://professional-to-do.onrender.com/api/todos/${id}/restore`,
        {},
        axiosConfig
      );
      setTodos(todos.map((t) => (t._id === id ? res.data.todo : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const onUpdateTodo = async (id, updatedFields) => {
    try {
      const res = await axios.put(
        `https://professional-to-do.onrender.com/api/todos/${id}`,
        updatedFields,
        axiosConfig
      );
      setTodos(todos.map((t) => (t._id === id ? res.data.todo : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const getFilteredTodos = () => {
    const pendingTodos = todos.filter((t) => t.status === "pending");
    if (filter === "today") return pendingTodos.filter((t) => isToday(t.dueDate));
    if (filter === "tomorrow")
      return pendingTodos.filter((t) => isTomorrow(t.dueDate));
    if (filter === "overdue")
      return pendingTodos.filter((t) => isOverdue(t.dueDate));
    return pendingTodos;
  };

  const EmptyList = ({ message }) => (
    <VStack
      spacing={3}
      mt={6}
      p={6}
      border="1px dashed gray"
      borderRadius="md"
      bg="gray.50"
    >
      <InfoOutlineIcon w={10} h={10} color="gray.400" />
      <Text
        fontSize={{ base: "md", md: "lg" }}
        color="gray.600"
        textAlign="center"
      >
        {message}
      </Text>
    </VStack>
  );

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
        <Text mt={4}>Loading tasks...</Text>
      </Box>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <Box maxW="900px" mx="auto" p={{ base: 4, md: 6 }}>
        <Heading
          mb={6}
          textAlign="center"
          fontSize={{ base: "2xl", md: "3xl" }}
        >
          📝 Professional To-Do App
        </Heading>

        <Stack spacing={4}>
          {/* Add New Task */}
          <AddTodo addTodo={addTodo} user={user} />

          {/* Tabs */}
          <Tabs variant="enclosed">
            <TabList flexWrap="wrap">
              <Tab>Pending</Tab>
              <Tab>Completed</Tab>
              <Tab>Deleted</Tab>
            </TabList>

            <TabPanels>
              {/* Pending */}
              <TabPanel>
                <ButtonGroup
                  mb={4}
                  size="sm"
                  isAttached
                  variant="outline"
                  flexWrap="wrap"
                >
                  <Button
                    onClick={() => setFilter("all")}
                    colorScheme={filter === "all" ? "blue" : "gray"}
                  >
                    All
                  </Button>
                  <Button
                    onClick={() => setFilter("today")}
                    colorScheme={filter === "today" ? "blue" : "gray"}
                  >
                    Today
                  </Button>
                  <Button
                    onClick={() => setFilter("tomorrow")}
                    colorScheme={filter === "tomorrow" ? "blue" : "gray"}
                  >
                    Tomorrow
                  </Button>
                  <Button
                    onClick={() => setFilter("overdue")}
                    colorScheme={filter === "overdue" ? "blue" : "gray"}
                  >
                    Overdue
                  </Button>
                </ButtonGroup>

                {getFilteredTodos().length === 0 ? (
                  <EmptyList message="No pending tasks! Add something new ✨" />
                ) : (
                  <VStack spacing={4} align="stretch">
                    <TodoList
                      todos={getFilteredTodos()}
                      onComplete={completeTodo}
                      onDelete={deleteTodo}
                      onUpdateTodo={onUpdateTodo}
                    />
                  </VStack>
                )}
              </TabPanel>

              {/* Completed */}
              <TabPanel>
                {todos.filter((t) => t.status === "completed").length === 0 ? (
                  <EmptyList message="No tasks completed yet 🎯" />
                ) : (
                  <CompletedList
                    todos={todos.filter((t) => t.status === "completed")}
                  />
                )}
              </TabPanel>

              {/* Deleted */}
              <TabPanel>
                {todos.filter((t) => t.status === "deleted").length === 0 ? (
                  <EmptyList message="No deleted tasks 🗑️" />
                ) : (
                  <DeletedList
                    todos={todos.filter((t) => t.status === "deleted")}
                    onRestore={restoreTodo}
                  />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Box>
    </ChakraProvider>
  );
}
