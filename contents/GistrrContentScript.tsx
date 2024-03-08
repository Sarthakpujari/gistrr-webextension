import { useEffect, useState } from "react";
import { Box, Button, ChakraProvider } from "@chakra-ui/react";

import { BookmarkInput } from "./components/Bookmarkinput";
import { Sidepanel } from "./components/Sidepanel/Sidepanel";
import { FloatingButtons } from "./components/Floatingbuttons";
import { theme } from "./chakraThemeExtend";

import type { PlasmoCSConfig } from "plasmo";

import "./GistrrContentScript.css";

import cssText from "data-text:~/contents/GistrrContentScript.css";
export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"],
};

const GoogleSidebar = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(true);
  const [hideFloatingButtons, setHideFloatingButtons] =
    useState<boolean>(false);

  useEffect(() => {
    // if (openModal === false) setHideFloatingButtons(false);
    // else setHideFloatingButtons(true);
    // if (openDrawer === false) setHideFloatingButtons(false);
    // else setHideFloatingButtons(true);
  }, [openModal, openDrawer]);

  return (
    <ChakraProvider theme={theme}>
      <FloatingButtons
        setOpenDrawer={setOpenDrawer}
        setOpenModal={setOpenModal}
        hideFloatingButtons={hideFloatingButtons}
        setHideFloatingButtons={setHideFloatingButtons}
      />
      <BookmarkInput openModal={openModal} setOpenModal={setOpenModal} />
      <Sidepanel openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </ChakraProvider>
  );
};

export default GoogleSidebar;
