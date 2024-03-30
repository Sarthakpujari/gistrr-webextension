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
  const trimLength = 20;
  const trimmedTitle =
    bookmark.title.length > trimLength
      ? `${bookmark.title.substring(0, trimLength)}...`
      : bookmark.title;
  return (
    <Box className="single-chat-container">
      <Box className="details-containe">
        <Box>
          <strong>{trimmedTitle}</strong> added to{" "}
          <strong>{bookmark.brain_name}</strong>
        </Box>
        <Box style={{ fontSize: "10px", fontWeight: "400" }} color="grey.500">
          Added {moment(bookmark.created_at).fromNow()}
        </Box>
      </Box>
    </Box>
  );
};
