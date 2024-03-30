import { Box } from "@chakra-ui/react";

import { SingleBrain } from "./Singlebrain";

import "./Brainpanel.css";

export const ChatPanel = ({
  closeDrawerOpenChat,
  brainList,
  setShowChatWindow,
}: {
  brainList: any[];
  setShowChatWindow;
}) => {
  return (
    <Box>
      {brainList?.map((brain, index) => (
        <SingleBrain
          key={index}
          brain={brain.brain}
          closeDrawerOpenChat={closeDrawerOpenChat}
          setShowChatWindow={setShowChatWindow}
        />
      ))}
    </Box>
  );
};
