import React from "react";
import { Header } from "./Header.tsx";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Image,
} from "@chakra-ui/react";


const HomePage = () => {
  return (
    <Box
      bg="gray.50"
      minH="100vh"
      py={10}
      px={6}
      bgGradient={[
        "linear(to-b, white, white)",
        "linear(to-b, white, purple.300)",
      ]}
    >
      <Header />
      <VStack
        spacing={6}
        align="center"
        textAlign="center"
        maxW="750px"
        mx="auto"
      >
        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="bold"
        >
          Automate Your Outbound With an All-In-One, AI-First Platform
        </Heading>
        <Text
          bgGradient="linear(to-r, #7d37ff, #0cf)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="extrabold"
        >
          Powered by AI Employees
        </Text>

        <Text fontSize="1.125rem" color="black" fontWeight={"600"}>
          Equip your team with the best-in-class outbound tools and our AI BDR
          Ava, who automates your entire outbound workflow.
        </Text>

        <Box
          mt={8}
          display="flex"
          border="1px solid"
          justifyContent="center"
          borderColor="black"
          borderRadius="full"
        >
          <HStack margin={"10px"}>
            <Input
              variant="filled"
              backgroundColor={"inherit"}
              placeholder="Enter Work Email"
              borderRadius="full"
              fontSize={"20px"}
              border="none"
              marginLeft={"15px"}
            />

            <Button
              colorScheme="purple"
              borderRadius="full"
              px={6}
              bgGradient="linear(to-r, purple.400, purple.300)"
              color="white"
              marginLeft="70px"
              _hover={{ bgGradient: "linear(to-r, purple.500, purple.400)" }}
            >
              Get Started
            </Button>
          </HStack>
        </Box>
        <Image
          boxSize="200px, 200px"
          src="https://www.artisanai.me/wp-content/uploads/2024/03/Ava-workflow.png"
        />
      </VStack>
    </Box>
  );
};

export default HomePage;
