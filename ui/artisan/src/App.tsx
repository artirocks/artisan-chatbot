import React from "react";
import {
  ChakraBaseProvider
} from "@chakra-ui/react";
import HomePage from "./components/HomePage.tsx";
import SignIn from "./components/Signin.tsx";
import SignUp from "./components/Signup.tsx";
import theme from "./theme/theme.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";
import { Navigate } from "react-router-dom";
import AvaChatbot from "./components/AvaChatbot.tsx";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/signin" />;
};

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/chats" element={<PrivateRoute><AvaChatbot /></PrivateRoute>} />
        </Routes>
      </Router>
      </ChakraBaseProvider>
  );
}

export default App;
