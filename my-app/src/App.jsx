import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import theme from "./theme";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Login from "./Components/Login";
import TodoApp from "./Components/todoApp";
import Register from "./Components/register";
import ForgotPassword from "./Components/forgotpassword";
import ResetPassword from "./Components/resetpassword";



export default function App() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(token ? { token } : null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header user={user} setUser={setUser} handleLogout={handleLogout} />
        <Box minH="80vh" p={4}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            {!user && (
              <>
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                {/* Dynamic route for reset password with token */}
                <Route path="/resetpassword/:token" element={<ResetPassword />} />
              </>
            )}

            {/* Private Routes */}
            {user && (
              <>
                <Route path="/todo" element={<TodoApp user={user} setUser={setUser} />} />
                <Route path="*" element={<Navigate to="/todo" />} />
              </>
            )}

            {/* Fallback for unauthenticated users */}
            {!user && <Route path="*" element={<Navigate to="/" />} />}
          </Routes>
        </Box>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}
