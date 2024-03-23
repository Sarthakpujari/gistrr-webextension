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
      {brainList?.map((brain) => {
        return (
          <SingleBrain
            brainId={brain.brain.id}
            key={brain.brain.id}
            brain={brain.brain}
            closeDrawerOpenChat={closeDrawerOpenChat}
          />
        );
      })}
    </Box>
  );
};
