import { useState, type Dispatch, type SetStateAction } from "react";
import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Drawer,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
} from "@chakra-ui/react";
import { ChatPanel } from "./Chatpanel";

import { ChatIcon } from "../Icons/ChatIcon";
import { HistoryIcon } from "../Icons/HistoryIcon";

import "./Sidepanel.css";
import { SearchBar } from "./Searchbar/SearchBar";

export const Sidepanel = ({
  openDrawer,
  setOpenDrawer,
}: {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <Drawer
      isOpen={openDrawer}
      placement="right"
      onClose={() => setOpenDrawer(false)}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader bgColor="green" color="white">
          Gistrr
        </DrawerHeader>
        <DrawerBody>
          <Tabs align="center" isFitted={true} marginTop={4}>
            <TabList>
              <Tab onClick={() => setTabIndex(0)}>
                <Box className="tab-header">
                  <Box>
                    <ChatIcon />
                  </Box>
                  <Box>Chat</Box>
                </Box>
              </Tab>
              <Tab onClick={() => setTabIndex(1)}>
                <Box className="tab-header">
                  <Box>
                    <HistoryIcon />
                  </Box>
                  <Box>History</Box>
                </Box>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel paddingLeft={0} paddingRight={0}>
                <SearchBar />
                <ChatPanel />
              </TabPanel>
              <TabPanel paddingLeft={0} paddingRight={0}>
                <SearchBar />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
        <DrawerFooter>
          {tabIndex === 0 && (
            <Button colorScheme="blue">Create New Chat</Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
