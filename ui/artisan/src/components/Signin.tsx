import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  Link,
  Switch,
  Image,
  Divider,
  AbsoluteCenter,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { Header } from "./Header.tsx";
import signInImage from "../assets/img/login.png";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const titleColor = useColorModeValue("purple.300", "purple.200");
  const textColor = useColorModeValue("gray.400", "white");
  const apiUrl = process.env.REACT_APP_AUTHENTICATION_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/authenticate/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token); // Save token
        navigate("/dashboard"); // Navigate to home page after login
      } else {
        const errMsg = await response.json();
        setError(errMsg.detail);
      }
    } catch (error) {
      // setError("Something went wrong. Please try again.");
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };
  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <Box>
      <Box mt={"20px"}>
        <Header />
      </Box>

      <Flex position="relative" mb="40px">
        <Flex
          h={{ sm: "initial", md: "75vh", lg: "85vh" }}
          w="100%"
          maxW="1044px"
          mx="auto"
          justifyContent="space-between"
          mb="30px"
          pt={{ sm: "100px", md: "0px" }}
        >
          <Flex
            alignItems="center"
            justifyContent="start"
            style={{ userSelect: "none" }}
            w={{ base: "100%", md: "50%", lg: "42%" }}
          >
            <Flex
              direction="column"
              w="100%"
              background="transparent"
              p="48px"
              mt={{ md: "150px", lg: "80px" }}
              alignItems={"center"}
            >
              <Heading fontSize="32px" mb="10px" alignContent={"center"}>
                Welcome Back !
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColor}
                fontSize="14px"
                alignContent={"center"}
              >
                Enter your email and password to sign in
              </Text>
              <Box
                w="100%"
                border="1px solid"
                justifyContent="center"
                borderColor="gray.300"
                borderRadius="full"
                mb="20px"
              >
                <Button
                  fontSize="20px"
                  type="submit"
                  backgroundColor={"inherit"}
                  w="100%"
                  h="45"
                  color="gray.300"
                >
                  <Link href="#">
                    <Icon
                      as={FaGoogle}
                      w="30px"
                      h="30px"
                      marginRight={"20px"}
                      _hover={{ filter: "brightness(120%)" }}
                    />
                  </Link>
                  <Text textColor={"black"} fontWeight={"none"}>
                    {" "}
                    Continue With Google
                  </Text>
                </Button>
              </Box>
              <Box position="relative" padding="2">
                <Divider borderColor="orange.500" color={"yellow"} />
                <AbsoluteCenter px="4">or</AbsoluteCenter>
              </Box>

              <FormControl>
                <form onSubmit={handleLogin}>
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    Email
                  </FormLabel>
                  <Input
                    borderRadius="15px"
                    mb="24px"
                    fontSize="sm"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                  />
                  <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                    Password
                  </FormLabel>
                  <Input
                    borderRadius="15px"
                    mb="36px"
                    fontSize="sm"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="lg"
                  />
                  <FormControl display="flex" alignItems="center">
                    <Switch
                      id="remember-login"
                      colorScheme="purple"
                      me="10px"
                    />
                    <FormLabel
                      htmlFor="remember-login"
                      mb="0"
                      ms="1"
                      fontWeight="normal"
                    >
                      Remember me
                    </FormLabel>
                  </FormControl>
                  {error && <Text color="red">{error}</Text>}
                  <Button
                    fontSize="18px"
                    type="submit"
                    bg="purple.300"
                    w="100%"
                    h="45"
                    mb="20px"
                    color="white"
                    mt="20px"
                    _hover={{
                      bg: "purple.200",
                    }}
                    _active={{
                      bg: "purple.400",
                    }}
                  >
                    SIGN IN
                  </Button>
                </form>
              </FormControl>
              <Box></Box>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxW="100%"
                mt="0px"
              >
                <Text color={textColor} fontWeight="medium">
                  Don't have an account?
                  <Link
                    color={titleColor}
                    as="span"
                    ms="5px"
                    fontWeight="bold"
                    onClick={handleSignupClick}
                  >
                    Sign Up
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Box
            display={{ base: "none", md: "block" }}
            overflowX="hidden"
            h="100%"
            w="40vw"
            position="absolute"
            right="0px"
          >
            <Box
              w="80%"
              h="80%"
              bgSize="cover"
              bgPosition="50%"
              borderBottomLeftRadius="20px"
              borderBottomRightRadius="20px"
              marginTop={"80px"}
            >
              <VStack>
                <Image
                  src="https://www.artisan.co/_next/image?url=%2Fassets%2Fartisan-primary-logo.webp&w=256&q=75"
                  alt="Artisan Logo"
                  cursor={"pointer"}
                  onClick={handleHomeClick}
                  marginBottom={"40px"}
                />
                <Image src={signInImage} />
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default SignIn;
