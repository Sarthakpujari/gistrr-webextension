import { createContext, useEffect, useState, type SetStateAction } from "react";
import { ChakraProvider, extendBaseTheme, extendTheme } from "@chakra-ui/react";
import { Storage } from "@plasmohq/storage";

import { BookmarkInput } from "../components/Bookmarkinput";
import { Sidepanel } from "../components/Sidepanel/Sidepanel";
import { FloatingButtons } from "../components/Floatingbuttons";
import { CreateBrain } from "../components/CreateBrain";
import { Chatwindow } from "../components/Chatwindow";
import { getUserBrains } from "~src/util/Api";

import type { PlasmoCSConfig, PlasmoGetShadowHostId } from "plasmo";

import "./GistrrContentScript.css";
import cssText from "data-text:~/contents/GistrrContentScript.css";

import type { UserContextType } from "~src/type";
import { chakraTheme } from "./chakraTheme";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
};

export const UserContext = createContext<UserContextType>({
  user: {},
  setUser: () => {},
  brainList: [],
  setBrainList: () => {},
});

const HOST_ID = "engage-csui";
export const getShadowHostId: PlasmoGetShadowHostId = () => HOST_ID;

const GoogleSidebar = () => {
  const [openBookmarkModal, setOpenBookmarkModal] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openBrainModal, setOpenBrainModal] = useState<boolean>(false);
  const [openChatWindow, setOpenChatWindow] = useState<boolean>(false);
  const [hideFloatingButtons, setHideFloatingButtons] =
    useState<boolean>(false);
  const storage = new Storage();
  const [brainList, setBrainList] = useState<any[]>([]);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (openBookmarkModal || openDrawer || openChatWindow)
      setHideFloatingButtons(true);
    else setHideFloatingButtons(false);
  }, [openBookmarkModal, openDrawer]);

  useEffect(() => {
    getBrainList();
  }, [user]);

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

  const closeDrawerOpenChat = () => {
    setOpenDrawer(false);
    setOpenChatWindow(true);
  };

  const closeChatOpenDrawer = () => {
    setOpenChatWindow(false);
    setOpenDrawer(true);
  };

  return (
    <ChakraProvider
      disableGlobalStyle={true}
      theme={chakraTheme}
      cssVarsRoot="gistrr"
    >
      <UserContext.Provider value={{ user, setUser, brainList, setBrainList }}>
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
        {openChatWindow && (
          <Chatwindow closeChatOpenDrawer={closeChatOpenDrawer} />
        )}
      </UserContext.Provider>
    </ChakraProvider>
  );
};

export default GoogleSidebar;
