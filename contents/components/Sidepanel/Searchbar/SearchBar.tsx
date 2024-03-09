import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export const SearchBar = () => {
  return (
    <Box className="search-bar-container">
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
        />
      </InputGroup>
    </Box>
  );
};
