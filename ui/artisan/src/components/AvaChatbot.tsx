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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useEditableControls,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  ChevronDownIcon,
  CloseIcon,
  CheckIcon,
} from "@chakra-ui/icons";
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
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
  const [editingMessage, setEditingMessage] = useState<number | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const messageContainerRef = useRef<HTMLDivElement>();

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
      user: "Jane",
      isBot: true,
    };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setInputValue("");
  };
  const handleEditMessage = async (id: number, newText: string) => {
    const updatedMessage: Message = {
      id: id,
      text: newText,
      user: "Jane",
      isBot: false,
    };
    setMessages((prevMessages) => [...prevMessages, updatedMessage]);

    const response = await fetch("http://localhost:8000/bot/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: newText }),
    });
    const data = await response.json();

    const botMessage: Message = {
      id: Date.now(),
      text: data.generated_text,
      user: "Ava",
      isBot: true,
    };

    setMessages((prevMessages) => [...prevMessages, botMessage]);

    setEditingMessageId(null);
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

  const startEditingMessage = (id: number, text: string) => {
    setEditingMessageId(id);
    setEditingText(text); // Set the current text in the input for editing
  };

  const submitEditedMessage = (id: number) => {
    if (editingText.trim()) {
      handleEditMessage(id, editingText);
    }
  };

  const EditableControls = ({ id }: { id: number }) => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
      useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm" mt="2">
        <IconButton
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
          onClick={() => submitEditedMessage(id)}
          aria-label="Submit"
        />
        <IconButton
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
          onClick={() => setEditingMessageId(null)}
          aria-label="Cancel"
        />
      </ButtonGroup>
    ) : null;
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
        height="640px"
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

          <VStack alignItems="center">
            <Avatar
              size="sm"
              name="Ava"
              src="https://www.artisan.co/assets/ava.svg"
            />
            <Text ml="2" fontWeight="bold">
              Hey, 👋 I am Ava
            </Text>
            <Text ml="2">Ask me anything or pick a place to start</Text>
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
              position="relative"
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
                onMouseEnter={() => setEditingMessage(message.id)}
                onMouseLeave={() => setEditingMessage(null)}
              >
                <Editable
                  value={
                    editingMessageId === message.id ? editingText : message.text
                  }
                  isDisabled={
                    message.isDeleted || editingMessageId !== message.id
                  }
                  onSubmit={(newText) => handleEditMessage(message.id, newText)}
                  onChange={setEditingText}
                  onFocus={() => setEditingMessageId(message.id)}
                >
                  <EditablePreview width="auto" />
                  <EditableInput />
                  {editingMessageId === message.id && !message.isBot && (
                    <EditableControls id={message.id} />
                  )}
                </Editable>

                {editingMessage === message.id &&
                  !message.isBot &&
                  !message.isDeleted && (
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<ChevronDownIcon />}
                        variant="ghost"
                        aria-label="More options"
                        size="sm"
                        position="absolute"
                        top="0"
                        right="0"
                      />
                      <MenuList>
                        <MenuItem
                          icon={<EditIcon />}
                          onClick={() =>
                            startEditingMessage(message.id, message.text)
                          }
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          icon={<DeleteIcon />}
                          onClick={() => handleDeleteMessage(message.id)}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
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
