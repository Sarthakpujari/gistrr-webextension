import { Box } from "@chakra-ui/react";

import { SingleChat } from "./Singlechat";

import "./Chatpanel.css";

export const ChatPanel = () => {
  return (
    <Box>
      <SingleChat />
      <SingleChat />
      <SingleChat />
      <SingleChat />
    </Box>
  );
};
