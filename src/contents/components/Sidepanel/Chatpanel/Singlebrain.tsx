import { Box } from "@chakra-ui/react";
import { Storage } from "@plasmohq/storage";
import { formatLocalTime } from "~src/util/time_format";

export const SingleBrain = ({
  brain,
  closeDrawerOpenChat,
}: {
  brain: any;
  closeDrawerOpenChat: () => void;
}) => {
  const storage = new Storage();
  const handleBrainClick = async () => {
    // TODO: put the active brain inside global state
    await storage.set("activeBrain", brain);
    closeDrawerOpenChat();
  };

  return (
    <Box className="single-chat-container" onClick={handleBrainClick}>
      <Box className="image-contianer"></Box>
      <Box className="details-container">
        <Box className="details-container__text">{brain.name}</Box>
        <Box className="details-container__subtext">
          <strong>Created at:</strong> {formatLocalTime(brain.created_at)}
        </Box>
      </Box>
    </Box>
  );
};
