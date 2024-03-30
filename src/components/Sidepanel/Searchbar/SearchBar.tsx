import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";

export const SearchBar = ({
  list,
  setFilteredList,
}: {
  list: Array<any>;
  setFilteredList: (filteredList: Array<any>) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchParam = e.target.value.toLowerCase();
    setSearchTerm(searchParam);
    const filteredList = list.filter((item) => {
      console.log("item", item);
      if (searchParam === "") return true; // If search term is empty, show all items
      return item.brain.name.toLowerCase().includes(searchParam);
    });
    setFilteredList(filteredList);
  };

  return (
    <Box width="95%">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.800" />
        </InputLeftElement>
        <Input
          placeholder="Search"
          size="md"
          className="search-bar"
          focusBorderColor="green.500"
          style={{ borderRadius: "10px" }}
          onChange={onChangeHandler}
          value={searchTerm}
        />
      </InputGroup>
    </Box>
  );
};
