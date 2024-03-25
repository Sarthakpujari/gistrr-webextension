import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Storage } from "@plasmohq/storage";
import moment from "moment";

import { getUserBookmark } from "~src/util/Api";
import { SingleHistory } from "./Singlehistory";

export const Historypanel = () => {
  const storage = new Storage();
  const [userBookmark, setUserBookmark] = useState<any[]>([
    {
      brain_name: "default",
      created_at: "2024-03-25T12:09:13.627969+00:00",
      id: "f44ec647-7172-4f90-989f-3ed6061a7527",
      title: "Drawer - Chakra UI",
      url: "https://chakra-ui.com/docs/components/drawer/usage",
      user: {
        name: "Pikachu Pika",
      },
    },
    {
      brain_name: "default",
      created_at: "2024-03-25T12:09:29.216415+00:00",
      id: "092571de-8cb8-4cc9-98c0-2869a12d911a",
      title: "Drawer - Chakra UI",
      url: "https://chakra-ui.com/docs/components/drawer/usage",
      user: {
        name: "Pikachu Pika",
      },
    },
    {
      brain_name: "default",
      created_at: "2024-03-25T12:11:20.153809+00:00",
      id: "6b893c40-ecb5-445c-bdcc-0a3c687c28b5",
      title: "Drawer - Chakra UI",
      url: "https://chakra-ui.com/docs/components/drawer/usage",
      user: {
        name: "Pikachu Pika",
      },
    },
    {
      brain_name: "default",
      created_at: "2024-03-25T12:11:52.904369+00:00",
      id: "711063be-aba4-4974-888d-d695d74e8f4d",
      title: "Drawer - Chakra UI",
      url: "https://chakra-ui.com/docs/components/drawer/usage",
      user: {
        name: "Pikachu Pika",
      },
    },
    {
      brain_name: "Ash",
      created_at: "2024-03-25T12:53:17.663089+00:00",
      id: "464b7677-e883-41b1-ae94-22fc5cafaec6",
      title: "AI.JSX | AI.JSX",
      url: "https://docs.ai-jsx.com/",
      user: {
        name: "Pikachu Pika",
      },
    },
  ]);

  useEffect(() => {
    fetchUserBookmark();
  }, []);

  const fetchUserBookmark = async () => {
    const userId = await storage.get("user");
    if (userId) {
      //   const response = await getUserBookmark({ userId });
      //   console.log("response >>> ", response);
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
