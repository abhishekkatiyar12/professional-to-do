// src/components/TodoApp.jsx
import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
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
  Stack,
  useToast,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import CompletedList from "./CompletedList";
import DeletedList from "./DeletedList";
import API from "../utils/api"; // centralized axios instance
import { isToday, isTomorrow, isOverdue } from "../utils/dateUtils";

export default function TodoApp({ user, setUser }) {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();

  const token = localStorage.getItem("token");

  // Redirect if not authenticated
  if (!token) return <Navigate to="/login" replace />;

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const res = await API.get("/todos");
        setTodos(res.data.todos);
      } catch (err) {
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to fetch todos.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [toast]);

  // Fetch logged-in user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    if (token) fetchUser();
  }, [token, setUser, navigate]);

  // --- Todo CRUD functions ---
  const addTodo = async (todo) => {
    try {
      const res = await API.post("/todos", todo);
      setTodos([res.data.todo, ...todos]);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to add todo.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const completeTodo = async (id) => {
    try {
      const res = await API.put(`/todos/${id}`, { status: "completed", completedAt: new Date().toISOString() });
      setTodos(todos.map((t) => (t._id === id ? res.data.todo : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await API.delete(`/todos/${id}`);
      setTodos(todos.map((t) => (t._id === id ? res.data.todo : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const restoreTodo = async (id) => {
    try {
      const res = await API.put(`/todos/${id}/restore`);
      setTodos(todos.map((t) => (t._id === id ? res.data.todo : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (id, updatedFields) => {
    try {
      const res = await API.put(`/todos/${id}`, updatedFields);
      setTodos(todos.map((t) => (t._id === id ? res.data.todo : t)));
    } catch (err) {
      console.error(err);
    }
  };

  // --- Filtered todos ---
  const getFilteredTodos = () => {
    const pendingTodos = todos.filter((t) => t.status === "pending");
    if (filter === "today") return pendingTodos.filter((t) => isToday(t.dueDate));
    if (filter === "tomorrow") return pendingTodos.filter((t) => isTomorrow(t.dueDate));
    if (filter === "overdue") return pendingTodos.filter((t) => isOverdue(t.dueDate));
    return pendingTodos;
  };

  const EmptyList = ({ message }) => (
    <VStack spacing={3} mt={6} p={6} border="1px dashed gray" borderRadius="md" bg="gray.50">
      <InfoOutlineIcon w={10} h={10} color="gray.400" />
      <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" textAlign="center">
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
    <Box maxW="900px" mx="auto" p={{ base: 4, md: 6 }}>
      <Stack spacing={4}>
        <AddTodo addTodo={addTodo} user={user} />

        <Tabs variant="enclosed">
          <TabList flexWrap="wrap">
            <Tab>Pending</Tab>
            <Tab>Completed</Tab>
            <Tab>Deleted</Tab>
          </TabList>

          <TabPanels>
            {/* Pending */}
            <TabPanel>
              <ButtonGroup mb={4} size="sm" isAttached variant="outline" flexWrap="wrap">
                <Button onClick={() => setFilter("all")} colorScheme={filter === "all" ? "blue" : "gray"}>All</Button>
                <Button onClick={() => setFilter("today")} colorScheme={filter === "today" ? "blue" : "gray"}>Today</Button>
                <Button onClick={() => setFilter("tomorrow")} colorScheme={filter === "tomorrow" ? "blue" : "gray"}>Tomorrow</Button>
                <Button onClick={() => setFilter("overdue")} colorScheme={filter === "overdue" ? "blue" : "gray"}>Overdue</Button>
              </ButtonGroup>

              {getFilteredTodos().length === 0 ? (
                <EmptyList message="No pending tasks! Add something new ✨" />
              ) : (
                <VStack spacing={4} align="stretch">
                  <TodoList
                    todos={getFilteredTodos()}
                    onComplete={completeTodo}
                    onDelete={deleteTodo}
                    onUpdateTodo={updateTodo}
                  />
                </VStack>
              )}
            </TabPanel>

            {/* Completed */}
            <TabPanel>
              {todos.filter((t) => t.status === "completed").length === 0 ? (
                <EmptyList message="No tasks completed yet 🎯" />
              ) : (
                <CompletedList todos={todos.filter((t) => t.status === "completed")} />
              )}
            </TabPanel>

            {/* Deleted */}
            <TabPanel>
              {todos.filter((t) => t.status === "deleted").length === 0 ? (
                <EmptyList message="No deleted tasks 🗑️" />
              ) : (
                <DeletedList todos={todos.filter((t) => t.status === "deleted")} onRestore={restoreTodo} />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Box>
  );
}
