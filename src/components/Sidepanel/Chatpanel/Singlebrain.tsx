import { Box } from "@chakra-ui/react";
import { Storage } from "@plasmohq/storage";
import { formatLocalTime } from "~src/util/time_format";

export const SingleBrain = ({
  brain,
  closeDrawerOpenChat,
  setShowChatWindow,
}: {
  brain: any;
  closeDrawerOpenChat: () => void;
  setShowChatWindow: (show: boolean) => void;
}) => {
  const storage = new Storage();
  const handleBrainClick = async () => {
    // TODO: put the active brain inside global state
    await storage.set("activeBrain", brain);
    closeDrawerOpenChat();
    setShowChatWindow(true);
  };

  return (
    <Box
      className="single-chat-container"
      onClick={handleBrainClick}
      _hover={{
        backgroundColor: "gray.100",
        cursor: "pointer",
      }}
    >
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
