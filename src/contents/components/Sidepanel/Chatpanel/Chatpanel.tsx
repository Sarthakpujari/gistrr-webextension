import { Box } from "@chakra-ui/react";

import { SingleChat } from "./Singlechat";

import type { Dispatch, SetStateAction } from "react";

import "./Chatpanel.css";

export const ChatPanel = ({
  closeDrawerOpenChat,
}: {
  closeDrawerOpenChat: () => void;
}) => {
  return (
    <Box>
      <SingleChat closeDrawerOpenChat={closeDrawerOpenChat} />
      <SingleChat closeDrawerOpenChat={closeDrawerOpenChat} />
      <SingleChat closeDrawerOpenChat={closeDrawerOpenChat} />
    </Box>
  );
};
