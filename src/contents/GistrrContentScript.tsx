import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { BookmarkInput } from "./components/Bookmarkinput";
import { Sidepanel } from "./components/Sidepanel/Sidepanel";
import { FloatingButtons } from "./components/Floatingbuttons";
import { theme } from "./chakraThemeExtend";
import { CreateBrain } from "./components/CreateBrain";
import { Chatwindow } from "./components/Chatwindow";

import type { PlasmoCSConfig } from "plasmo";

import "./GistrrContentScript.css";
import cssText from "data-text:~/contents/GistrrContentScript.css";
import { Storage } from "@plasmohq/storage";
import { getUserBrains } from "~src/util/Api";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
};

const GoogleSidebar = () => {
  const [openBookmarkModal, setOpenBookmarkModal] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openBrainModal, setOpenBrainModal] = useState<boolean>(false);
  const [openChatWindow, setOpenChatWindow] = useState<boolean>(false);
  const [hideFloatingButtons, setHideFloatingButtons] =
    useState<boolean>(false);
  const storage = new Storage();
  const [brainList, setBrainList] = useState<any[]>([]);

  useEffect(() => {
    if (openBookmarkModal || openDrawer) setHideFloatingButtons(true);
    else setHideFloatingButtons(false);
  }, [openBookmarkModal, openDrawer]);

  useEffect(() => {
    getBrainList();
  }, []);

  const getBrainList = async () => {
    const userId = await storage.get("userId");
    console.log("userID >>> ", userId);
    if (!userId) {
      console.error("User not found");
      return;
    } else {
      const brainListFromUser = await getUserBrains(userId);
      setBrainList(brainListFromUser);
    }
  };

  const closeDrawerOpenChat = () => {
    setOpenDrawer(false);
    setOpenChatWindow(true);
  };

  const closeChatOpenDrawer = () => {
    setOpenChatWindow(false);
    setOpenDrawer(true);
  };

  return (
    <ChakraProvider theme={theme}>
      <BookmarkInput
        openBookmarkModal={openBookmarkModal}
        setOpenBookmarkModal={setOpenBookmarkModal}
        brainList={brainList}
      />
      <CreateBrain
        openBrainModal={openBrainModal}
        setOpenBrainModal={setOpenBrainModal}
      />
      <FloatingButtons
        setOpenDrawer={setOpenDrawer}
        setOpenBookmarkModal={setOpenBookmarkModal}
        hideFloatingButtons={hideFloatingButtons}
      />
      <Sidepanel
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        openBrainModal={openBrainModal}
        setOpenBrainModal={setOpenBrainModal}
        closeDrawerOpenChat={closeDrawerOpenChat}
        brainList={brainList}
      />
      <Chatwindow
        openChatWindow={openChatWindow}
        closeChatOpenDrawer={closeChatOpenDrawer}
      />
    </ChakraProvider>
  );
};

export default GoogleSidebar;
