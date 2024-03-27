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
import { CreateUser } from "~src/util/Api/ClubbedRequests";

import { ChatPanel } from "./Chatpanel";
import { ChatIcon } from "../Icons/ChatIcon";
import { HistoryIcon } from "../Icons/HistoryIcon";
import { SearchBar } from "./Searchbar/SearchBar";
import { MoreIcon } from "../Icons/MoreIcon";
import { Historypanel } from "./Historypanel";

import "./Sidepanel.css";

export const Sidepanel = ({
  openDrawer,
  openBrainModal,
  setOpenDrawer,
  setOpenBrainModal,
  closeDrawerOpenChat,
  brainList,
}: {
  openDrawer: boolean;
  openBrainModal: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
  setOpenBrainModal: Dispatch<SetStateAction<boolean>>;
  closeDrawerOpenChat: () => void;
  brainList: any[];
}) => {
  const storage = new Storage();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhoto, setUserPhoto] = useState<string>("");

  useEffect(() => {
    userDetailsFromStore();
  }, []);

  const setStates = (email: string, displayName: string, photoURL: string) => {
    setUserEmail(email);
    setUserName(displayName);
    setUserPhoto(photoURL);
  };

  const userDetailsFromStore = async () => {
    const user: { email: string; displayName: string; photoURL: string } =
      await storage.get("user");
    if (user) {
      const { email, displayName, photoURL } = user;
      setStates(email, displayName, photoURL);
    }
  };

  const fetchUserFromBackground = async () => {
    try {
      const responseFromBackground = await sendToBackground({
        name: "auth",
        body: { action: "signin" },
      });

      const {
        user: { email, displayName, photoURL },
      } = responseFromBackground;

      const userId = await CreateUser({
        email,
        name: displayName,
        profileImageUrl: photoURL,
      });

      storage.set("userId", userId);

      setStates(email, displayName, photoURL);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutMessageToBackground = async () => {
    try {
      await sendToBackground({
        name: "auth",
        body: { action: "signout" },
      });
      setUserName("");
      setUserEmail("");
      setUserPhoto("");
      storage.remove("userId");
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
            <Box className="floating-close-button">
              <Button colorScheme="green" onClick={() => setOpenDrawer(false)}>
                Close
              </Button>
            </Box>
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
                <ChatPanel
                  closeDrawerOpenChat={closeDrawerOpenChat}
                  brainList={brainList}
                />
              </TabPanel>
              <TabPanel paddingLeft={0} paddingRight={0}>
                <SearchBar />
                <Historypanel />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
        <DrawerFooter>{tabIndex === 0 && loginStatus()}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
