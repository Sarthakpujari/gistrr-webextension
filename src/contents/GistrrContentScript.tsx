import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { BookmarkInput } from "./components/Bookmarkinput";
import { Sidepanel } from "./components/Sidepanel/Sidepanel";
import { FloatingButtons } from "./components/Floatingbuttons";
import { theme } from "./chakraThemeExtend";
import { CreateBrain } from "./components/CreateBrain";

import type { PlasmoCSConfig } from "plasmo";

import "./GistrrContentScript.css";

import cssText from "data-text:~/contents/GistrrContentScript.css";
import { Chatwindow } from "./components/Chatwindow";

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

  useEffect(() => {
    if (openBookmarkModal || openDrawer) setHideFloatingButtons(true);
    else setHideFloatingButtons(false);
  }, [openBookmarkModal, openDrawer]);

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
      />
      <Chatwindow
        openChatWindow={openChatWindow}
        closeChatOpenDrawer={closeChatOpenDrawer}
      />
    </ChakraProvider>
  );
};

export default GoogleSidebar;
