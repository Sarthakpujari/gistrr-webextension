import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import { Search2Icon, SmallCloseIcon, PlusSquareIcon,ArrowUpIcon } from "@chakra-ui/icons";
import type { ChangeEvent } from "react";

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
  onChangeHandler,
  setShowCreateBrainModal,
  setOpenBookmarkModal
}: {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  setShowCreateBrainModal: (value: boolean) => void;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  setOpenBookmarkModal: (value: boolean) => void;
}) => {
  return (
    <Box
      width="90%"
      display="flex"
      gap="10px"
      flexDirection="row"
      alignItems="center"
    >
      <Box width="90%">
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
            {searchTerm && (
              <SmallCloseIcon
                cursor="pointer"
                onClick={() => {
                  setSearchTerm("");
                  // @ts-ignore
                  onChangeHandler({ target: { value: "" } });
                }}
              />
            )}
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box>
        <Tooltip hasArrow label="Add to Brain" size="lg" placement="left">
          <ArrowUpIcon
            boxSize={5}
            cursor="pointer"
            onClick={() => setOpenBookmarkModal(true)}
          />
        </Tooltip>
      </Box>
      <Box>
        <Tooltip hasArrow label="Create Brain" size="lg" placement="top">
          <PlusSquareIcon
            boxSize={5}
            cursor="pointer"
            onClick={() => setShowCreateBrainModal(true)}
          />
        </Tooltip>
      </Box>
    </Box>
  );
};
