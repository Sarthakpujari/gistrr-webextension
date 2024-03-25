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
import moment from "moment";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { Storage } from "@plasmohq/storage";
import {
  chat as sendToLLM,
  insertChat as insertChatToAPI,
  getBrainChat as getBrainChatFromAPI,
} from "~src/util/Api";
import { formatLocalTime } from "~src/util/time_format";

import "./Chatwindow.scss";

export const Chatwindow = ({
  closeChatOpenDrawer,
}: {
  closeChatOpenDrawer: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<
    { sender: string; text: string; sentTime: string }[]
  >([]);
  const [brainName, setBrainName] = useState<string>("");

  const storage = new Storage();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getBrainChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getBrainChat = async () => {
    const currentBrain: { id: string; name: string } =
      await storage.get("activeBrain");
    setBrainName(currentBrain.name);
    const userId = await storage.get("userId");

    if (userId && currentBrain.id !== "") {
      const chatData = await getBrainChatFromAPI({
        receiverUserId: userId,
        senderUserId: currentBrain.id,
        lastCursor: 10000,
        pageSize: 100,
      });
      console.log("chatData >>> ", chatData);
      const chatDataFormatted = chatData
        .map((chatItem) => {
          return {
            sender: chatItem.chat_type === "user" ? "User" : "Bot",
            text: chatItem.text,
            sentTime: chatItem.created_at,
          };
        })
        .reverse();
      setChat(chatDataFormatted);
    }
  };

  const handleClose = () => closeChatOpenDrawer();

  const pushToChat = (msgToLoad, sender) =>
    setChat((prevChat) => [
      ...prevChat,
      { sender, text: msgToLoad, sentTime: moment().toISOString() },
    ]);

  const insertChat = async (params) => await insertChatToAPI(params);

  const handleChat = async () => {
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
    <Drawer isOpen={true} placement="right" onClose={handleClose} size="md">
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
          {brainName}
        </DrawerHeader>
        <DrawerBody>
          <Box
            className="messages"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {chat.map((msg, index) => (
              <Box
                key={index}
                className={`message ${msg.sender === "Bot" ? "bot" : "user"}`}
              >
                {msg.text}
                <div className="sent-time">{formatLocalTime(msg.sentTime)}</div>
              </Box>
            ))}
          </Box>
          <Box className="loading">{loading && "Typing..."}</Box>
          <Box ref={messagesEndRef} />
        </DrawerBody>
        <DrawerFooter>
          <InputGroup>
            <Input
              type="text"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleChat}
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
