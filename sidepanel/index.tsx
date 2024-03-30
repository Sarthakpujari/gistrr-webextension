import { ChatIcon } from "@chakra-ui/icons";
import {
  Box,
  ChakraProvider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Storage } from "@plasmohq/storage";
import { useEffect, useState } from "react";
import { Chatwindow } from "~src/contents/components/Chatwindow";
import { HistoryIcon } from "~src/contents/components/Icons/HistoryIcon";
import { ChatPanel } from "~src/contents/components/Sidepanel/Chatpanel";
import { Historypanel } from "~src/contents/components/Sidepanel/Historypanel";
import { SearchBar } from "~src/contents/components/Sidepanel/Searchbar";
import { getUserBrains } from "~src/util/Api";

function IndexSidePanel() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [brainList, setBrainList] = useState<any[]>([]);
  const [showChatWindow, setShowChatWindow] = useState<boolean>(false);
  const storage = new Storage();

  useEffect(() => {
    getBrainList();
  }, []);

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
          <SearchBar />
          <ChatPanel
            closeDrawerOpenChat={() => {}}
            brainList={brainList}
            setShowChatWindow={setShowChatWindow}
          />
        </TabPanel>
        <TabPanel paddingLeft={0} paddingRight={0}>
          <SearchBar />
          <Historypanel />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );

  const chatLayout = () => (
    <Chatwindow
      closeDrawerOpenChat={() => {}}
      setShowChatWindow={setShowChatWindow}
    />
  );

  return (
    <ChakraProvider>
      {showChatWindow ? chatLayout() : tabLayout()}
    </ChakraProvider>
  );
}

export default IndexSidePanel;
