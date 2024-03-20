import { Box } from "@chakra-ui/react";

import { SingleBrain } from "./Singlebrain";

import "./Brainpanel.css";
import { useEffect, useState } from "react";
import { getUserBrains } from "~src/util/Api";
import { Storage } from "@plasmohq/storage";

export const ChatPanel = ({
  closeDrawerOpenChat,
}: {
  closeDrawerOpenChat: () => void;
}) => {
  const [brainList, setBrainList] = useState<any[]>([]);
  console.log("brainList >>> ", brainList);
  const storage = new Storage();

  useEffect(() => {
    getBrainList();
  }, []);

  const getBrainList = async () => {
    const userId = await storage.get("userId");
    console.log("userID:", userId);
    if (!userId) {
      console.error("User not found");
      return;
    } else {
      const brainListFromUser = await getUserBrains(userId);
      setBrainList(brainListFromUser);
    }
  };

  return (
    <Box>
      {brainList?.map((brain) => {
        return (
          <SingleBrain
            brain={brain.brain}
            closeDrawerOpenChat={closeDrawerOpenChat}
          />
        );
      })}
    </Box>
  );
};
