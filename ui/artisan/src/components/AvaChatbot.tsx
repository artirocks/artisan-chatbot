import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  Avatar,
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const AvaChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Function to handle sending message and getting response
  const handleSendMessage = async () => {
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      user: "Jane",
      isBot: false,
    };
    setMessages([...messages, userMessage]);

    // Using fetch to call an API
    const response = await fetch("http://localhost:8000/bot/generate", {
      method: "POST", // Change method to POST
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify({ prompt: inputValue }), // Include body with JSON payload
    });
    const data = await response.json();
    // data.generated_text;

    // const data = await response.json(); // Parse response as JSON

    const botMessage = {
      id: Date.now() + 1,
      text: data.generated_text, // Get message from API response
      user: "Ava",
      isBot: true,
    };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setInputValue(""); // Clear input field
  };

  // Function to edit a message
  const handleEditMessage = (id, newText) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, text: newText } : msg
      )
    );
  };

  const handleDeleteMessage = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id
          ? { ...msg, text: "Message has been deleted", isDeleted: true }
          : msg
      )
    );
  };

  return (
    <Box width="400px" p="4" bg="gray.50" borderRadius="lg" boxShadow="md">
      <Flex direction="column" mb="4">
        {messages.map((message) => (
          <Flex
            key={message.id}
            alignItems="center"
            justifyContent={message.isBot ? "flex-start" : "flex-end"}
            mb="2"
          >
            {message.isBot && <Avatar size="sm" name="Ava" src="/avatar.png" />}
            <Box
              bg={message.isBot ? "gray.100" : "purple.100"}
              p="3"
              borderRadius="lg"
              maxWidth="80%"
              position="relative"
            >
              <Editable
                value={message.text} // Use value instead of defaultValue to dynamically render the updated message
                isDisabled={message.isDeleted} // Allow editing for user messages only if they are not deleted
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
                  {/* Edit Icon */}
                  <IconButton
                    size="sm"
                    icon={<EditIcon />}
                    onClick={
                      () => {} /* Chakra UI's Editable handles edit mode internally */
                    }
                    variant="ghost"
                    colorScheme="blue"
                  />

                  {/* Delete Icon */}
                  <IconButton
                    size="sm"
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteMessage(message.id)}
                    variant="ghost"
                    colorScheme="red"
                    mt="2"
                  />
                </Flex>
              )}
            </Box>
          </Flex>
        ))}
      </Flex>

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
  );
};

export default AvaChatbot;
