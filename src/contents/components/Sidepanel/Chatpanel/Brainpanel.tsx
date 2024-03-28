import { Box } from "@chakra-ui/react";

import { SingleBrain } from "./Singlebrain";

import "./Brainpanel.css";

export const ChatPanel = ({
  closeDrawerOpenChat,
  brainList,
}: {
  closeDrawerOpenChat: () => void;
  brainList: any[];
}) => {
  return (
    <Box>
      {brainList?.map((brain, index) => (
        <SingleBrain
          key={index}
          brain={brain.brain}
          closeDrawerOpenChat={closeDrawerOpenChat}
        />
      ))}
    </Box>
  );
};
