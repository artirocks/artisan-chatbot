import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

function SignUp() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_AUTHENTICATION_API_BASE_URL;

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/authenticate/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        navigate("/signin"); // Navigate to sign-in page after successful sign-up
      } else {
        const errMsg = await response.json();
        setError(errMsg.detail);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={
          "https://i.pinimg.com/originals/0a/46/0b/0a460bf677706ab9bebade425e25a0a7.jpg"
        }
        bgSize="cover"
      ></Box>

      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="0.7rem"
        mb="30px"
      >
        <Text mt="1.5rem" fontSize="4xl" color="white" fontWeight="bold">
          Welcome!
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
        >
          Use these awesome forms to create a new account for your project.
        </Text>
      </Flex>

      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        >
          <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            Register
          </Text>
          <form onSubmit={handleSignUp}>
            <FormControl mb="24px">
              <FormLabel>Name</FormLabel>
              <Input
                fontSize="sm"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl mb="24px">
              <FormLabel>Email</FormLabel>
              <Input
                fontSize="sm"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mb="24px">
              <FormLabel>Password</FormLabel>
              <Input
                fontSize="sm"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {error && <Text color="red">{error}</Text>}
            <Button
              type="submit"
              bg="purple.300"
              color="white"
              fontWeight="bold"
              w="100%"
              h="45"
              mb="24px"
              _hover={{ bg: "purple.200" }}
            >
              SIGN UP
            </Button>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;
