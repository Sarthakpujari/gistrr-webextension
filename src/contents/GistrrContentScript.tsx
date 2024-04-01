import { createContext, useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Storage } from "@plasmohq/storage";

import { FloatingButtons } from "../components/Floatingbuttons";
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
  const [hideFloatingButtons, setHideFloatingButtons] =
    useState<boolean>(false);
  const storage = new Storage();
  const [brainList, setBrainList] = useState<any[]>([]);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (openBookmarkModal) setHideFloatingButtons(true);
    else setHideFloatingButtons(false);
  }, [openBookmarkModal]);

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

  return (
    <ChakraProvider
      disableGlobalStyle={true}
      theme={chakraTheme}
      cssVarsRoot="gistrr"
    >
      <UserContext.Provider value={{ user, setUser, brainList, setBrainList }}>
        <FloatingButtons
          setOpenBookmarkModal={setOpenBookmarkModal}
          hideFloatingButtons={hideFloatingButtons}
        />
      </UserContext.Provider>
    </ChakraProvider>
  );
};

export default GoogleSidebar;
