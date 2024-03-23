import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import React, { useEffect } from "react";

import "./Chatwindow.css";
import { chat } from "~src/util/Api";
import { Storage } from "@plasmohq/storage";

export const Chatwindow = ({
  openChatWindow,
  closeChatOpenDrawer,
}: {
  openChatWindow: boolean;
  closeChatOpenDrawer: () => void;
}) => {
  const handleClose = () => {
    closeChatOpenDrawer();
  };
  const storage = new Storage();

  useEffect(() => {
    handleChat();
  }, []);

  const handleChat = async () => {
    const currentBrain = await storage.get("activeBrainId");
    const userId = await storage.get("userId");
    console.log("currentBrain >>> ", currentBrain);
    console.log("userId >>> ", userId);
    if (userId && currentBrain !== "") {
      const response = await chat({
        userId: userId,
        brainId: "a9dad190-9706-4977-b342-18331e0fe61f",
        query: "Who are you?",
      });
      console.log("response >>> ", response);
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
        <DrawerBody>Hello Chat Window</DrawerBody>
        <DrawerFooter>
          <Input />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
