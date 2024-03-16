import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  Button,
  DrawerBody,
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
import { sendToBackground } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";

import { ChatPanel } from "./Chatpanel";
import { ChatIcon } from "../Icons/ChatIcon";
import { HistoryIcon } from "../Icons/HistoryIcon";
import { SearchBar } from "./Searchbar/SearchBar";
import { MoreIcon } from "../Icons/MoreIcon";

import "./Sidepanel.css";

export const Sidepanel = ({
  openDrawer,
  openBrainModal,
  setOpenDrawer,
  setOpenBrainModal,
  closeDrawerOpenChat,
}: {
  openDrawer: boolean;
  openBrainModal: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  setOpenBrainModal: Dispatch<SetStateAction<boolean>>;
  closeDrawerOpenChat: () => void;
}) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhoto, setUserPhoto] = useState<string>("");

  useEffect(() => {
    userDetailsFromStore();
  }, []);

  const userDetailsFromStore = async () => {
    const storage = new Storage();
    const user: { email: string; displayName: string; photoURL: string } =
      await storage.get("user");

    if (user) {
      const { email, displayName, photoURL } = user;
      setUserEmail(email);
      setUserName(displayName);
      setUserPhoto(photoURL);
    }
  };

  const fetchUserFromBackground = async () => {
    try {
      await sendToBackground({
        name: "auth",
        body: { action: "signin" },
      });
      userDetailsFromStore();
    } catch (error) {
      console.log(error);
    }
  };

  const logoutMessageToBackground = async () => {
    console.log("logoutMessageToBackground");
    try {
      await sendToBackground({
        name: "auth",
        body: { action: "signout" },
      });
      setUserName("");
      setUserEmail("");
      setUserPhoto("");
    } catch (error) {
      console.log(error);
    }
  };

  const loginStatus = () => {
    if (userName) {
      return (
        <Button colorScheme="blue" onClick={logoutMessageToBackground}>
          Logout
        </Button>
      );
    } else {
      return (
        <Button colorScheme="blue" onClick={fetchUserFromBackground}>
          G
        </Button>
      );
    }
  };

  return (
    <Drawer
      isOpen={openDrawer}
      placement="right"
      onClose={() => setOpenDrawer(false)}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          bgColor="green"
          color="white"
          className="side-panel-header"
        >
          <Box display="flex" justifyContent="space-between" width="100%">
            <Box>
              {userPhoto && <img width={30} height={20} src={userPhoto} />}
            </Box>
            <Box>Gistrr</Box>
            <Box
              className="more-icon"
              onClick={() => setOpenBrainModal(!openBrainModal)}
            >
              <MoreIcon />
            </Box>
          </Box>
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
                <ChatPanel closeDrawerOpenChat={closeDrawerOpenChat} />
              </TabPanel>
              <TabPanel paddingLeft={0} paddingRight={0}>
                <SearchBar />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
        <DrawerFooter>{tabIndex === 0 && loginStatus()}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
