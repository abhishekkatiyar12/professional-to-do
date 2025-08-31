import { useState } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/register";
import TodoApp from "./Components/todo";
import theme from "./theme";

export default function App() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(token ? { token } : null);
  const [page, setPage] = useState("home"); // home, login, register

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setPage("home");
  };

  return (
    <ChakraProvider theme={theme}>
      <Header user={user} setPage={setPage} handleLogout={handleLogout} />
      <Box minH="80vh" p={4}>
        {!user && page === "home" && <Home setPage={setPage} />}
        {!user && page === "register" && <Register setUser={setUser} setPage={setPage} />}
        {!user && page === "login" && <Login setUser={setUser} setPage={setPage} />}
        {user && <TodoApp />}
      </Box>
      <Footer />
    </ChakraProvider>
  );
}
