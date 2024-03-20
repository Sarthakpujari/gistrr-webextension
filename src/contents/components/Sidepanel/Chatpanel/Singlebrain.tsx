import { Box } from "@chakra-ui/react";

export const SingleBrain = ({
  brain,
  closeDrawerOpenChat,
}: {
  brain: any;
  closeDrawerOpenChat: () => void;
}) => {
  return (
    <Box
      className="single-chat-container"
      onClick={() => closeDrawerOpenChat()}
    >
      <Box className="image-contianer"></Box>
      <Box className="details-container">
        <Box className="details-container__text">{brain.Name}</Box>
        <Box className="details-container__subtext">{brain.updated_at}</Box>
      </Box>
    </Box>
  );
};
