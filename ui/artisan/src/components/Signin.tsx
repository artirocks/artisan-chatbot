import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header.tsx";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Image,
  Divider,
  AbsoluteCenter,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import signInImage from "../assets/img/login.png";

function SignIn() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleHomeClick = () => {
    navigate("/"); // Navigate to the login route
  };
  const handleSignupClick = () => {
    navigate("/signup"); // Navigate to the login route
  };
  // Chakra color mode
  const titleColor = useColorModeValue("purple.300", "purple.200");
  const textColor = useColorModeValue("gray.400", "white");
  return (
    <Box>
      <Box mt={"20px"}><Header /></Box>
      <Flex position="relative" mb="40px" >
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
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Email
                </FormLabel>
                <Input
                  borderRadius="15px"
                  mb="24px"
                  fontSize="sm"
                  type="text"
                  placeholder="Your email adress"
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
                  placeholder="Your password"
                  size="lg"
                />
                <FormControl display="flex" alignItems="center">
                  <Switch id="remember-login" colorScheme="purple" me="10px" />
                  <FormLabel
                    htmlFor="remember-login"
                    mb="0"
                    ms="1"
                    fontWeight="normal"
                  >
                    Remember me
                  </FormLabel>
                </FormControl>
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
              </FormControl>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxW="100%"
                mt="0px"
              >
                <Text color={textColor} fontWeight="medium">
                  Don't have an account?
                  <Link color={titleColor} as="span" ms="5px" fontWeight="bold" onClick={handleSignupClick}>
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
              {/* bgImage={signInImage} */}
              <VStack>
                <Image
                  src="https://www.artisan.co/_next/image?url=%2Fassets%2Fartisan-primary-logo.webp&w=256&q=75"
                  alt="Artisan Logo"
                  cursor={"pointer"}
                  onClick={handleHomeClick}
                  marginBottom={"40px"}
                />
                <Image
                  src={signInImage}
                />
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default SignIn;
