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
import { createContext, useEffect, useState } from "react";
import { Chatwindow } from "~src/components/Chatwindow";
import { CreateBrain } from "~src/components/CreateBrain";
import { HistoryIcon } from "~src/components/Icons/HistoryIcon";
import { Historypanel } from "~src/components/Sidepanel/Historypanel";
import { Brainpanel } from "~src/components/Sidepanel/Chatpanel";
import { getUserBrains } from "~src/util/Api";

import type { BrainContextType } from "~src/type";

export const BrainContext = createContext<BrainContextType>({
  brainList: [],
  getBrainList: () => {},
});

function IndexSidePanel() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [brainList, setBrainList] = useState<any[]>([]);
  const [showChatWindow, setShowChatWindow] = useState<boolean>(false);
  const [showCreateBrainModal, setShowCreateBrainModal] =
    useState<boolean>(false);
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
          <Brainpanel
            closeDrawerOpenChat={() => {}}
            setShowChatWindow={setShowChatWindow}
            setShowCreateBrainModal={setShowCreateBrainModal}
          />
        </TabPanel>
        <TabPanel paddingLeft={0} paddingRight={0}>
          <Historypanel setShowCreateBrainModal={setShowCreateBrainModal} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );

  const chatLayout = () => <Chatwindow setShowChatWindow={setShowChatWindow} />;

  return (
    <ChakraProvider>
      <BrainContext.Provider value={{ brainList, getBrainList }}>
        <Box display="flex" flexDirection="column" width="95%">
          <Box>{showChatWindow ? chatLayout() : tabLayout()}</Box>
        </Box>
        <CreateBrain
          openBrainModal={showCreateBrainModal}
          setOpenBrainModal={setShowCreateBrainModal}
        />
      </BrainContext.Provider>
    </ChakraProvider>
  );
}

export default IndexSidePanel;
