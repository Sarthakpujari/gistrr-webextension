import { Box } from "@chakra-ui/react";

export const SingleChat = ({
  closeDrawerOpenChat,
}: {
  closeDrawerOpenChat: () => void;
}) => {
  return (
    <Box
      className="single-chat-container"
      onClick={() => closeDrawerOpenChat()}
    >
      <Box className="image-contianer"></Box>
      <Box className="details-container">
        <Box className="details-container__text">Job Application</Box>
        <Box className="details-container__subtext">Update 5 hours ago</Box>
      </Box>
    </Box>
  );
};
