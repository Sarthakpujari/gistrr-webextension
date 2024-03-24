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
import React, { useState } from "react";
import {
  chat as sendToLLM,
  insertChat as insertChatToAPI,
} from "~src/util/Api";
import { Storage } from "@plasmohq/storage";

import "./Chatwindow.css";

export const Chatwindow = ({
  closeChatOpenDrawer,
}: {
  closeChatOpenDrawer: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<{ sender: string; text: string }[]>([]);
  const storage = new Storage();

  const handleClose = () => {
    closeChatOpenDrawer();
  };

  const pushToChat = (msgToLoad, sender) => {
    setChat((prevChat) => [...prevChat, { sender, text: msgToLoad }]);
  };

  const insertChat = async (params) => {
    const { id: insertChatId } = await insertChatToAPI(params);
    console.log("Chat inserted with id >>> ", insertChatId);
  };

  const handleChat = async () => {
    console.log("message >>> ", message);
    const currentBrain = await storage.get("activeBrainId");
    const userId = await storage.get("userId");

    if (userId && currentBrain !== "" && message !== "") {
      pushToChat(message, "User");
      setMessage("");
      setLoading(true);
      await insertChat({
        receiverUserId: currentBrain,
        senderUserId: userId,
        text: message,
        url: "",
        responseSourceUrl: [],
        chatType: "user",
      });
      const messageFromLLM = await sendToLLM({
        userId: userId,
        brainId: currentBrain,
        query: message,
      });
      setLoading(false);
      pushToChat(messageFromLLM, "Bot");
      await insertChat({
        receiverUserId: userId,
        senderUserId: currentBrain,
        text: messageFromLLM,
        url: "",
        responseSourceUrl: [],
        chatType: "system",
      });
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
