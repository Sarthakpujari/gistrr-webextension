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
    <Box
      width="95%"
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
        <Tooltip hasArrow label="Create brain" size="lg" placement="left">
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
