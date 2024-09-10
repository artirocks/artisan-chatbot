import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Image,
  useColorModeValue,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Breadcrumb,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  Text,
  VStack,
  Grid,
  Icon,
} from "@chakra-ui/react";
import { CreditIcon, ProfileIcon, SettingsIcon } from "./Icons/Icons.tsx";
import { NavLink } from "react-router-dom";
import {
  BellIcon,
  RepeatClockIcon,
  SearchIcon,
  StarIcon,
  ViewIcon,
  ChatIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { CartIcon, DocumentIcon } from "./Icons/Icons.tsx";
import AvaChatbot from "./AvaChatbot.tsx";
export default function Dashboard() {
  const mainText = useColorModeValue("gray.700", "gray.200");
  const secondaryText = useColorModeValue("gray.400", "gray.200");
  const brandText = "Dashboard";
  const mainTeal = useColorModeValue("purple.300", "purple.300");
  const inputBg = useColorModeValue("white", "gray.800");
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  const searchIcon = useColorModeValue("gray.700", "gray.200");
  const [isChatbotOpen, setChatbotOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleChatbot = () => {
    setChatbotOpen(!isChatbotOpen);
  };

  return (
    <>
      <Flex height="100vh" width="100%">
        <Box
          width="250px"
          bgGradient="linear(to-b, purple.300, blue.400)"
          color="white"
          padding="6"
          display="flex"
          flexDirection="column"
          alignItems="center"
          boxShadow="2xl"
        >
          <Box mt={2} mb={8} width="100%" textAlign="center">
            <Image
              src="https://www.artisan.co/_next/image?url=%2Fassets%2Fartisan-primary-logo.webp&w=256&q=75"
              alt="Artisan Logo"
              cursor="pointer"
              onClick={handleLogoClick}
            />
          </Box>
          <VStack
            spacing={6}
            align="stretch"
            w="100%"
            alignItems={"left"}
            mt="50px"
          >
            <Box
              as={NavLink}
              to="/dashboard"
              bg="whiteAlpha.300"
              color="white"
              borderRadius="10px"
              p={3}
              textAlign="left"
              _hover={{ bg: "whiteAlpha.400" }}
              transition="background 0.3s"
            >
              <Flex align="center" justifyContent="flex-start">
                {" "}
                <CartIcon color="white" w="20px" h="20px" mr={3} />
                <Text>Dashboard</Text>
              </Flex>
            </Box>
            <Box
              as={NavLink}
              to="/documents"
              bg="whiteAlpha.300"
              color="white"
              borderRadius="10px"
              p={3}
              textAlign="left"
              _hover={{ bg: "whiteAlpha.400" }}
              transition="background 0.3s"
            >
              <Flex align="center" justifyContent="flex-start">
                {" "}
                <DocumentIcon color="white" w="20px" h="20px" mr={3} />
                <Text>Documents</Text>
              </Flex>
            </Box>
            <Box
              as={NavLink}
              to="/billing"
              bg="whiteAlpha.300"
              color="white"
              borderRadius="10px"
              p={3}
              textAlign="left"
              _hover={{ bg: "whiteAlpha.400" }}
              transition="background 0.3s"
            >
              <Flex align="center" justifyContent="flex-start">
                {" "}
                <CreditIcon color="white" w="20px" h="20px" mr={3} />
                <Text>Billing</Text>
              </Flex>
            </Box>
            <Box
              as={NavLink}
              to="/analytics"
              bg="whiteAlpha.300"
              color="white"
              borderRadius="10px"
              p={3}
              textAlign="left"
              _hover={{ bg: "whiteAlpha.400" }}
              transition="background 0.3s"
            >
              <Flex align="center" justifyContent="flex-start">
                {" "}
                <CreditIcon color="white" w="20px" h="20px" mr={3} />
                <Text>Analytics</Text>
              </Flex>
            </Box>
          </VStack>
        </Box>
        <Box bg="gray.100" flex="1" p="8">
          <Flex height="10vh" width="100%">
            <Box mb={{ sm: "8px", md: "0px" }}>
              <Breadcrumb>
                <BreadcrumbItem color={mainText}>
                  <BreadcrumbLink href="#" color={secondaryText}>
                    Pages
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem color={mainText}>
                  <BreadcrumbLink href="#" color={mainText}>
                    {brandText}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>

            <Box flex="1" ml="auto" alignItems="center">
              <Flex align="center" justifyContent="flex-end">
                <InputGroup
                  cursor="pointer"
                  bg={inputBg}
                  borderRadius="15px"
                  w={{ sm: "128px", md: "200px" }}
                  me={{ sm: "auto", md: "20px" }}
                  _focus={{ borderColor: mainTeal }}
                  _active={{ borderColor: mainTeal }}
                >
                  <InputLeftElement>
                    <IconButton
                      bg="inherit"
                      borderRadius="inherit"
                      _hover="none"
                      _active={{
                        bg: "inherit",
                        transform: "none",
                        borderColor: "transparent",
                      }}
                      _focus={{ boxShadow: "none" }}
                      icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
                    />
                  </InputLeftElement>
                  <Input
                    fontSize="xs"
                    py="11px"
                    color={mainText}
                    placeholder="Type here..."
                    borderRadius="inherit"
                  />
                </InputGroup>
                <NavLink to="/">
                  <Button
                    ms="0px"
                    px="0px"
                    me={{ sm: "2px", md: "16px" }}
                    color={navbarIcon}
                    variant="transparent-with-icon"
                    rightIcon={
                      <ProfileIcon color={navbarIcon} w="22px" h="22px" />
                    }
                  >
                    <Text display={{ sm: "none", md: "flex" }}>Sign Out</Text>
                  </Button>
                </NavLink>
                <SettingsIcon
                  ml="10px"
                  cursor="pointer"
                  ms="16px"
                  me="16px"
                  color={navbarIcon}
                  w="18px"
                  h="18px"
                />
                <Menu>
                  <MenuButton>
                    <BellIcon color={navbarIcon} w="18px" h="18px" />
                  </MenuButton>
                </Menu>
              </Flex>
            </Box>
          </Flex>

          {!isChatbotOpen && (
            <>
              <Grid
                templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }}
                gap={6}
                mt={10}
                mx="auto"
                maxW="80%"
                px={4}
                height={"350px"}
              >
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p={6}
                  bg="white"
                  boxShadow="lg"
                  textAlign="center"
                >
                  <Flex direction="column" align="center" mb={4}>
                    <Icon
                      as={StarIcon}
                      boxSize={12}
                      color="green.500"
                      height={"30px"}
                      mb={8}
                    />
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                      Consolidate Your Fragmented Stack
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      We consolidate every tool your team needs for outbound
                      with best-in-class products – from B2B Data to Email
                      Warmup.
                    </Text>
                  </Flex>
                </Box>

                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p={6}
                  bg="white"
                  boxShadow="lg"
                  textAlign="center"
                >
                  <Flex direction="column" align="center" mb={4}>
                    <Icon
                      as={ViewIcon}
                      boxSize={12}
                      color="blue.500"
                      height={"30px"}
                      mb={8}
                    />
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                      Free Reps to Focus on High-Leverage Work
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      Ava automates over 80% of your BDRs' outbound workflow.
                      This frees up your reps to focus on high-leverage
                      activities.
                    </Text>
                  </Flex>
                </Box>

                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p={6}
                  bg="white"
                  boxShadow="lg"
                  textAlign="center"
                >
                  <Flex direction="column" align="center" mb={4}>
                    <Icon
                      as={RepeatClockIcon}
                      boxSize={12}
                      color="yellow.500"
                      height={"30px"}
                      mb={8}
                    />
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                      Automate Your Best Manual Strategies
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      We can build custom Playbooks that replicate the research
                      & email writing workflows of your top performers.
                    </Text>
                  </Flex>
                </Box>
              </Grid>
              <IconButton
                aria-label="Open chatbot"
                icon={<ChatIcon />}
                onClick={toggleChatbot}
                position="fixed"
                bottom="20px"
                right="20px"
                borderRadius="full"
                colorScheme="purple"
              />
            </>
          )}
          {isChatbotOpen && (
            <Box flex="1" p="8" position="relative">
              <AvaChatbot />
              <IconButton
                aria-label="Close chatbot"
                icon={<CloseIcon />}
                onClick={toggleChatbot}
                position="absolute"
                mt={0}
                right="2px"
                borderRadius="full"
                colorScheme="red"
              />
            </Box>
          )}
        </Box>
      </Flex>
    </>
  );
}
