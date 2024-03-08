import { useState } from "react";
import { Box, Button, ChakraProvider, extendTheme } from "@chakra-ui/react";

import { BookmarkInput } from "./components/Bookmarkinput";
import { Sidepanel } from "./components/Sidepanel/Sidepanel";

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

const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: "#F8F5F1",
        },
      }),
    },
    Input: {
      baseStyle: {
        bg: "#F2F2F2",
        _focus: { bg: "#F2F2F2" },
        _hover: { bg: "#F2F2F2" },
      },
    },
  },
});

const GoogleSidebar = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  return (
    <ChakraProvider theme={theme}>
      <Box className="floating-container">
        <Button onClick={() => setOpenDrawer(true)}>Open Drawer</Button>
        <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
      </Box>
      <BookmarkInput openModal={openModal} setOpenModal={setOpenModal} />
      <Sidepanel openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </ChakraProvider>
  );
};

export default GoogleSidebar;
