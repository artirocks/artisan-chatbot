import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Button,
  Input,
  Avatar,
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CloseIcon } from "@chakra-ui/icons";
import { TfiArrowsCorner } from "react-icons/tfi";
import { CgWebsite } from "react-icons/cg";

type Message = {
  id: number;
  text: string;
  user: string;
  isBot: boolean;
  isDeleted?: boolean;
};

const AvaChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true); // State to handle the chat window visibility

  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSendMessage = async () => {
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      user: "Jane",
      isBot: false,
    };
    setMessages([...messages, userMessage]);

    const response = await fetch("http://localhost:8000/bot/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: inputValue }),
    });
    const data = await response.json();

    const botMessage: Message = {
      id: Date.now() + 1,
      text: data.generated_text,
      user: "Ava",
      isBot: true,
    };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setInputValue("");
  };

  const handleEditMessage = (id: number, newText: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, text: newText } : msg
      )
    );
  };

  const handleDeleteMessage = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id
          ? { ...msg, text: "Message has been deleted", isDeleted: true }
          : msg
      )
    );
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isChatOpen) return null;

  return (
    <Box position="fixed" bottom="20px" right="20px">
      <Box
        width="400px"
        height="620px"
        p="4"
        bg="gray.50"
        borderRadius="lg"
        boxShadow="md"
      >
        <Box>
          <IconButton
            size="sm"
            icon={<TfiArrowsCorner />}
            onClick={() => setIsChatOpen(false)}
            variant="ghost"
            aria-label="Expand chat"
          />
          <IconButton
            size="sm"
            icon={<CgWebsite />}
            onClick={() => setIsChatOpen(false)}
            variant="ghost"
            aria-label="Open dashboard"
          />
          {/* <IconButton
            size="sm"
            icon={<CloseIcon />}
            onClick={() => setIsChatOpen(false)}
            variant="ghost"
            aria-label="Close chat"
          /> */}

          <VStack alignItems="center">
            <Avatar
              size="sm"
              name="Ava"
              src="https://www.artisan.co/assets/ava.svg"
            />
            <Text ml="2" fontWeight="bold">
              I am Ava, How can I help you?
            </Text>
          </VStack>
        </Box>
        <Divider mt={7} />
        <Box
          ref={messageContainerRef}
          overflowY="auto"
          overflowX="hidden"
          height="400px"
          mb="4"
          p="2"
          bg="white"
          borderRadius="md"
          boxShadow="sm"
          wordWrap="break-word"
          whiteSpace="pre-wrap"
        >
          {messages.map((message) => (
            <Flex
              key={message.id}
              alignItems="center"
              justifyContent={message.isBot ? "flex-start" : "flex-end"}
              mb="2"
            >
              {message.isBot && (
                <Avatar
                  size="sm"
                  name="Ava"
                  src="https://www.artisan.co/assets/ava.svg"
                />
              )}
              <Box
                bg={message.isBot ? "gray.100" : "purple.100"}
                p="3"
                borderRadius="lg"
                maxWidth="80%"
                position="relative"
                wordWrap="break-word"
                whiteSpace="pre-wrap"
              >
                <Editable
                  value={message.text}
                  isDisabled={message.isDeleted}
                  onSubmit={(newText) => handleEditMessage(message.id, newText)}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>

                {!message.isBot && !message.isDeleted && (
                  <Flex
                    position="absolute"
                    top="0"
                    right="-30px"
                    direction="column"
                  >
                    <IconButton
                      size="sm"
                      icon={<EditIcon />}
                      variant="ghost"
                      colorScheme="blue"
                      aria-label="Edit message"
                    />

                    <IconButton
                      size="sm"
                      icon={<DeleteIcon />}
                      onClick={() => handleDeleteMessage(message.id)}
                      variant="ghost"
                      colorScheme="red"
                      mt="2"
                      aria-label="Delete message"
                    />
                  </Flex>
                )}
              </Box>
            </Flex>
          ))}
        </Box>
        <Flex mt="4">
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            mr="2"
          />
          <Button onClick={handleSendMessage} colorScheme="purple">
            Send
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default AvaChatbot;
