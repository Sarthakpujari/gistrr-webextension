import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { BookmarkInput } from "./components/Bookmarkinput";

import iconBase64 from "data-base64:~assets/icon.png";
import type { PlasmoCSConfig } from "plasmo";
import cssText from "data-text:~/contents/google-sidebar.css";

import "./google-sidebar-base.css";

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/*"],
};

// Inject into the ShadowDOM
export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

export const getShadowHostId = () => "plasmo-google-sidebar";

const GoogleSidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.toggle("plasmo-google-sidebar-show", isOpen);
  }, [isOpen]);

  return (
    <ChakraProvider>
      <div id="sidebar" className={isOpen ? "open" : "closed"}>
        <div className="floating-container">
          <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "🟡 Close" : "🟣 Open"}
          </button>
          <button
            className="float-button"
            onClick={() => setOpenModal(!openModal)}
          >
            Open Modal
          </button>
        </div>
        <img src={iconBase64} alt="Extension Icon" width={128} height={128} />
        <p>Your second brain is getting ready to chat</p>
        <BookmarkInput openModal={openModal} setOpenModal={setOpenModal} />
      </div>
    </ChakraProvider>
  );
};

export default GoogleSidebar;
