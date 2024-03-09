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
  const [openBrainModal, setOpenBrainModal] = useState<boolean>(false);

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
      <Sidepanel
        openDrawer={openDrawer}
        openBrainModal={openBrainModal}
        setOpenBrainModal={setOpenBrainModal}
        setOpenDrawer={setOpenDrawer}
      />
      <CreateBrain
        openBrainModal={openBrainModal}
        setOpenBrainModal={setOpenBrainModal}
      />
    </ChakraProvider>
  );
};

export default GoogleSidebar;
