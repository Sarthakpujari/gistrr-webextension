import { Box, Text } from "@chakra-ui/react";
import moment from "moment";

import "./Historypanel.scss";

export const SingleHistory = ({
  bookmark,
}: {
  bookmark: {
    brain_name: string;
    created_at: string;
    id: string;
    title: string;
    url: string;
    user: { name: string };
  };
}) => {
  return (
    <Box className="single-chat-container">
      <Box className="details-containe">
        <Box display="flex" gap="3px">
          <Text fontSize="14px" fontWeight="600">
            {bookmark.title}
          </Text>{" "}
          <Text fontSize="14px" fontWeight="400">
            Added to
          </Text>{" "}
          <Text fontSize="14px" fontWeight="600">
            {bookmark.brain_name}
          </Text>
        </Box>
        <Box style={{ fontSize: "10px", fontWeight: "400" }} color="grey.500">
          Added {moment(bookmark.created_at).fromNow()}
        </Box>
      </Box>
    </Box>
  );
};
