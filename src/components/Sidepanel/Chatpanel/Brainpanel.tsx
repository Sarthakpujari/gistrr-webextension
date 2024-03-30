import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { SingleBrain } from "./Singlebrain";
import { SearchBar } from "../Searchbar";

import "./Brainpanel.css";

export const ChatPanel = ({
  closeDrawerOpenChat,
  brainList,
  setShowChatWindow,
}: {
  closeDrawerOpenChat: () => void;
  brainList: any[];
  setShowChatWindow: (show: boolean) => void;
}) => {
  const [filteredList, setFilteredList] = useState<any[]>(brainList);

  useEffect(() => {
    setFilteredList(brainList);
  }, [brainList]);

  return (
    <Box>
      <SearchBar list={brainList} setFilteredList={setFilteredList} />
      {filteredList.map((brain, index) => (
        <SingleBrain
          key={index}
          brain={brain.brain}
          closeDrawerOpenChat={closeDrawerOpenChat}
          setShowChatWindow={setShowChatWindow}
        />
      ))}
    </Box>
  );
};
