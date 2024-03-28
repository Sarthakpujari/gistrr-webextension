import { useContext, useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Storage } from "@plasmohq/storage";
import { UserContext } from "~src/contents/GistrrContentScript";
import moment from "moment";

import { getUserBookmarks } from "~src/util/Api";
import { SingleHistory } from "./Singlehistory";

export const Historypanel = () => {
  const storage = new Storage();
  const [userBookmark, setUserBookmark] = useState<any[]>();
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchUserBookmark();
  }, [user]);

  const fetchUserBookmark = async () => {
    const userId = await storage.get("userId");
    if (userId) {
      const response = await getUserBookmarks({ userId });
      response.sort(
        (a: { created_at: string }, b: { created_at: string }) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setUserBookmark(response);
    }
  };

  return (
    <Box>
      {userBookmark?.map((bookmark, index) => (
        <SingleHistory key={index} bookmark={bookmark} />
      ))}
    </Box>
  );
};
