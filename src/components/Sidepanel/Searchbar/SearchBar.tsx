import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { Search2Icon, SmallCloseIcon } from "@chakra-ui/icons";

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
  onChangeHandler,
}: {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
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
        {searchTerm && (
          <InputRightElement>
            <SmallCloseIcon
              cursor="pointer"
              onClick={() => {
                setSearchTerm("");
                onChangeHandler({ target: { value: "" } });
              }}
            />
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
};
