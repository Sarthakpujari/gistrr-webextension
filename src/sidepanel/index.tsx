import { createContext, useEffect, useState } from "react";
import { ChatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ChakraProvider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Storage } from "@plasmohq/storage";
import { sendToBackground } from "@plasmohq/messaging";
import { Chatwindow } from "~src/components/Chatwindow";
import { CreateBrain } from "~src/components/CreateBrain";
import { HistoryIcon } from "~src/components/Icons/HistoryIcon";
import { Historypanel } from "~src/components/Sidepanel/Historypanel";
import { Brainpanel } from "~src/components/Sidepanel/Chatpanel";
import { getUserBrains } from "~src/util/Api";
import { CreateUser } from "~src/util/Api/ClubbedRequests";
import { BookmarkInput } from "~src/components/Bookmarkinput";

import type { BrainContextType } from "~src/type";

export const BrainContext = createContext<BrainContextType>({
  brainList: [],
  getBrainList: () => {},
});

export const UserContext = createContext({
  user: {},
});

function IndexSidePanel() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [brainList, setBrainList] = useState<any[]>([]);
  const [showChatWindow, setShowChatWindow] = useState<boolean>(false);
  const [showCreateBrainModal, setShowCreateBrainModal] =
    useState<boolean>(false);
  const [loginState, setLoginState] = useState<boolean>(false);
  const [openBookmarkModal, setOpenBookmarkModal] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [openAddColabModal, setOpenAddColabModal] = useState<boolean>(false);
  const storage = new Storage();

  useEffect(() => {
    checkLoginState();
    // checkStorageToOpenModal();
  }, []);

  const checkStorageToOpenModal = async () => {
    const userId = await storage.get("userId");
    storage.get("openBookmarkModal").then((value) => {
      if (value && userId) {
        setOpenBookmarkModal(true);
        storage.remove("openBookmarkModal");
      }
    });
  };

  const checkLoginState = async () => {
    const userId = await storage.get("userId");
    if (userId) {
      setLoginState(true);
      getBrainList();
    }
  };

  const getBrainList = async () => {
    const userId = await storage.get("userId");
    if (!userId) {
      console.error("User not found");
      return;
    } else {
      const brainListFromUser = await getUserBrains(userId);
      setBrainList(brainListFromUser);
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
      getBrainList();
      setLoginState(true);
      setUser({ userId, email, displayName, photoURL });
    } catch (error) {
      console.log(error);
    }
  };

  const tabLayout = () => (
    <Tabs align="center" isFitted={true} marginTop={4}>
      <TabList>
        <Tab onClick={() => setTabIndex(0)}>
          <Box display="flex" gap="10px">
            <Box>
              <ChatIcon />
            </Box>
            <Box>Chat</Box>
          </Box>
        </Tab>
        <Tab onClick={() => setTabIndex(1)}>
          <Box display="flex" gap="10px">
            <Box>
              <HistoryIcon />
            </Box>
            <Box>History</Box>
          </Box>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel paddingLeft={0} paddingRight={0}>
          <Brainpanel
            closeDrawerOpenChat={() => {}}
            setShowChatWindow={setShowChatWindow}
            setShowCreateBrainModal={setShowCreateBrainModal}
            setOpenBookmarkModal={setOpenBookmarkModal}
          />
        </TabPanel>
        <TabPanel paddingLeft={0} paddingRight={0}>
          <Historypanel setShowCreateBrainModal={setShowCreateBrainModal} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );

  const chatLayout = () => (
    <Chatwindow
      setShowChatWindow={setShowChatWindow}
      setOpenAddColabModal={setOpenAddColabModal}
    />
  );

  const loginScreen = () => (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex="10"
      backgroundColor="rgba(0, 0, 0, 0.5)"
    >
      <Button
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50px"
        width="80%"
        marginLeft="auto"
        marginRight="auto"
        cursor="pointer"
        bg="#1A73E8"
        color="white"
        _hover={{
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        onClick={fetchUserFromBackground}
      >
        Login with Google
      </Button>
    </Box>
  );

  return (
    <ChakraProvider>
      <UserContext.Provider value={{ user }}>
        <BrainContext.Provider value={{ brainList, getBrainList }}>
          {loginState ? (
            <Box>
              <Box>{showChatWindow ? chatLayout() : tabLayout()}</Box>
            </Box>
          ) : (
            loginScreen()
          )}
          <CreateBrain
            openBrainModal={showCreateBrainModal}
            setOpenBrainModal={setShowCreateBrainModal}
            openAddColabModal={openAddColabModal}
            setOpenAddColabModal={setOpenAddColabModal}
          />
          <BookmarkInput
            brainList={brainList}
            openBookmarkModal={openBookmarkModal}
            setOpenBookmarkModal={setOpenBookmarkModal}
          />
        </BrainContext.Provider>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default IndexSidePanel;
