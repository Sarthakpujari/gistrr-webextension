import { useContext, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { SingleBrain } from "./Singlebrain";
import { SearchBar } from "../Searchbar";

import "./Brainpanel.css";
import { BrainContext } from "~src/sidepanel";

export const Brainpanel = ({
  setShowChatWindow,
  closeDrawerOpenChat,
  setShowCreateBrainModal,
}: {
  closeDrawerOpenChat: () => void;
  setShowChatWindow: (show: boolean) => void;
  setShowCreateBrainModal: (show: boolean) => void;
}) => {
  const { brainList } = useContext(BrainContext);
  const [filteredList, setFilteredList] = useState<any[]>(brainList);
  const [searchTerm, setSearchTerm] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchParam = e.target.value.toLowerCase();
    setSearchTerm(searchParam);
    const filteredList = brainList.filter((item) => {
      if (searchParam === "") return true; // If search term is empty, show all items
      return item.brain.name.toLowerCase().includes(searchParam);
    });
    setFilteredList([...filteredList]);
  };

  useEffect(() => {
    setFilteredList(brainList);
  }, [brainList]);

  return (
    <Box>
      <SearchBar
        searchTerm={searchTerm}
        onChangeHandler={onChangeHandler}
        setSearchTerm={setSearchTerm}
        setShowCreateBrainModal={setShowCreateBrainModal}
      />
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
