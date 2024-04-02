import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import { Search2Icon, SmallCloseIcon, PlusSquareIcon } from "@chakra-ui/icons";
import type { ChangeEvent } from "react";

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
  onChangeHandler,
  setShowCreateBrainModal,
}: {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  setShowCreateBrainModal: (value: boolean) => void;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Box width="95%" display="flex" gap="10px">
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
        <InputRightElement>
          {searchTerm ? (
            <SmallCloseIcon
              cursor="pointer"
              onClick={() => {
                setSearchTerm("");
                // @ts-ignore
                onChangeHandler({ target: { value: "" } });
              }}
            />
          ) : (
            <Tooltip hasArrow label="Create brain" size="lg" placement="left">
              <PlusSquareIcon
                cursor="pointer"
                onClick={() => setShowCreateBrainModal(true)}
              />
            </Tooltip>
          )}
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};
