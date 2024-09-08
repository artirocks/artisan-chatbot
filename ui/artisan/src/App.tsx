import React from "react";
import {
  ChakraBaseProvider
} from "@chakra-ui/react";
import HomePage from "./components/HomePage.tsx";
import SignIn from "./components/Signin.tsx";
import SignUp from "./components/Signup.tsx";
import theme from "./theme/theme.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
      </ChakraBaseProvider>
  );
}

export default App;
