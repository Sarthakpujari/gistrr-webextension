import { Box } from "@chakra-ui/react";
import { Storage } from "@plasmohq/storage";

export const SingleBrain = ({
  brain,
  closeDrawerOpenChat,
  brainId,
}: {
  brain: any;
  closeDrawerOpenChat: () => void;
  brainId: string;
}) => {
  const storage = new Storage();
  return (
    <Box
      className="single-chat-container"
      onClick={async () => {
        await storage.set("activeBrainId", brainId);
        closeDrawerOpenChat();
      }}
    >
      <Box className="image-contianer"></Box>
      <Box className="details-container">
        <Box className="details-container__text">{brain.Name}</Box>
        <Box className="details-container__subtext">{brain.updated_at}</Box>
      </Box>
    </Box>
  );
};
