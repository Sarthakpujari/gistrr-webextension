import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";

import "./Chatwindow.css";
import { chat as sendToLLM } from "~src/util/Api";
import { Storage } from "@plasmohq/storage";

export const Chatwindow = ({
  openChatWindow,
  closeChatOpenDrawer,
}: {
  openChatWindow: boolean;
  closeChatOpenDrawer: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<{ sender: string; text: string }[]>([]);

  const handleClose = () => {
    closeChatOpenDrawer();
  };
  const storage = new Storage();

  const pushToChat = (msgToLoad, sender) => {
    setChat((prevChat) => [...prevChat, { sender, text: msgToLoad }]);
  };

  const handleChat = async (e) => {
    pushToChat(message, "User");
    setMessage("");
    const currentBrain = await storage.get("activeBrainId");
    const userId = await storage.get("userId");
    if (userId && currentBrain !== "") {
      setLoading(true);
      const response = await sendToLLM({
        userId: userId,
        brainId: "a9dad190-9706-4977-b342-18331e0fe61f",
        query: message,
      });
      const messageFromLLM = response.response;
      setLoading(false);
      pushToChat(messageFromLLM, "Bot");
    }
  };

  return (
    <Drawer isOpen={true} placement="right" onClose={handleClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          bgColor="green"
          color="white"
          className="chat-window-header"
        >
          <Box className="chat-window-header-icon">
            <ArrowLeftIcon onClick={handleClose} />
          </Box>
          Chat Window
        </DrawerHeader>
        <DrawerBody>
          <br />
          <Box>
            {chat.map((msg, index) => (
              <div key={index}>
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
          </Box>
          <Box>{loading && "Loading..."}</Box>
        </DrawerBody>
        <DrawerFooter>
          <InputGroup>
            <Input
              type="text"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleChat}>
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
