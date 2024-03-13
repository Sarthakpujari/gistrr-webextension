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
import React from "react";

import "./Chatwindow.css";

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

  return (
    <Drawer isOpen={openChatWindow} placement="right" onClose={handleClose}>
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
