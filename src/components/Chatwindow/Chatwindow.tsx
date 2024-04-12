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
  Tooltip,
} from "@chakra-ui/react";
import moment from "moment";
import { AddIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { Storage } from "@plasmohq/storage";
import {
  chat as sendToLLM,
  insertChat as insertChatToAPI,
} from "~src/util/Api";
import { formatLocalTime } from "~src/util/time_format";

import "./Chatwindow.scss";
import { getChatAndNotif } from "~src/util/Api/ClubbedRequests/GetChat";

export const Chatwindow = ({
  setShowChatWindow,
  setOpenAddColabModal,
}: {
  setShowChatWindow: (value: boolean) => void;
  setOpenAddColabModal: (value: boolean) => void;
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
      const { chatData, notifData } = await getChatAndNotif(
        userId,
        currentBrain.id
      );
      const completeChat = [...chatData, ...notifData];
      const sortedCompleteChat = completeChat.sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });

      // sortedArray now contains all items from both arrays, sorted by created_at
      const chatDataFormatted = sortedCompleteChat.map((chatItem) => {
        return {
          sender:
            chatItem.chat_type === "user"
              ? "User"
              : chatItem.chat_type === "system"
                ? "Bot"
                : "Notif",
          text: chatItem.text,
          sentTime: chatItem.created_at,
        };
      });
      setChat(chatDataFormatted);
    }
  };

  const handleClose = () => {
    setShowChatWindow(false);
    // closeChatOpenDrawer();
  };

  const pushToChat = (msgToLoad, sender) =>
    setChat((prevChat) => [
      ...prevChat,
      { sender, text: msgToLoad, sentTime: moment().toISOString() },
    ]);

  const insertChat = async (params) => await insertChatToAPI(params);

  const handleChat = async () => {
    const currentBrain: { id: string; name: string } =
      await storage.get("activeBrain");
    const userId = await storage.get("userId");
    const brainId = currentBrain.id;

    if (userId && currentBrain.id !== "" && message !== "") {
      pushToChat(message, "User");
      setMessage("");
      setLoading(true);
      await insertChat({
        receiverUserId: brainId,
        senderUserId: userId,
        text: message,
        url: "",
        responseSourceUrl: [],
        chatType: "user",
      });
      const messageFromLLM = await sendToLLM({
        userId: userId,
        brainId,
        query: message,
      });
      setLoading(false);
      pushToChat(messageFromLLM, "Bot");
      await insertChat({
        receiverUserId: userId,
        senderUserId: brainId,
        text: messageFromLLM,
        url: "",
        responseSourceUrl: [],
        chatType: "system",
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("send-chat-btn").click();
    }
  };

  return (
    <Drawer isOpen={true} placement="right" onClose={handleClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader className="chat-window-header">
          <Box display="flex" gap="200px">
            <Box display="flex" gap="10px">
              <Box className="chat-window-header-icon">
                <ArrowLeftIcon onClick={handleClose} />
              </Box>
              {brainName}
            </Box>
            <Box>
              <Tooltip
                label="Add collaborators"
                placement="left"
                hasArrow
              >
                <AddIcon
                  boxSize={3}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => setOpenAddColabModal(true)}
                />
              </Tooltip>
            </Box>
          </Box>
        </DrawerHeader>
        <DrawerBody>
          <Box
            className="messages"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {chat.map((msg, index) => (
              <Box
                key={index}
                className={`message ${msg.sender === "Bot" ? "bot" : msg.sender === "User" ? "user" : "system"}`}
              >
                {msg.text}
                {msg.sender !== "Notif" && (
                  <div className="sent-time">
                    {formatLocalTime(msg.sentTime)}
                  </div>
                )}
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
              onKeyDown={handleKeyDown}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleChat}
                id="send-chat-btn"
              >
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
