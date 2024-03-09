import { Box } from "@chakra-ui/react";

export const SingleChat = () => {
  return (
    <Box className="single-chat-container">
      <Box className="image-contianer"></Box>
      <Box className="details-container">
        <Box className="details-container__text">Job Application</Box>
        <Box className="details-container__subtext">Update 5 hours ago</Box>
      </Box>
    </Box>
  );
};
