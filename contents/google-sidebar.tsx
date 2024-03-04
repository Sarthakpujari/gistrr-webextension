import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useState } from "react";
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from "@chakra-ui/react";
const { Button } = chakraTheme.components;
const theme = extendBaseTheme({
  components: {
    Button,
  },
});

import iconBase64 from "data-base64:~assets/icon.png";
import cssText from "data-text:~/contents/google-sidebar.css";

// Inject to the webpage itself
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
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    setTitle(document.title);
    setUrl(window.location.href);
    document.body.classList.toggle("plasmo-google-sidebar-show", isOpen);
  }, [isOpen]);

  return (
    <ChakraBaseProvider theme={theme}>
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
        {openModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-content">
                <button
                  className="modal-close-btn"
                  onClick={() => setOpenModal(false)}
                >
                  X
                </button>
                Hello There! Whant do you want to save now ?
                <div className="input-field">
                  <div>
                    <label>Bookmark title</label>
                    <input
                      type="text"
                      value={title}
                      style={{ width: "300px" }}
                    />
                  </div>
                  <div>
                    <label>Bookmark URL</label>
                    <input type="text" value={url} style={{ width: "300px" }} />
                  </div>
                  <div>
                    <label>Folder name</label>
                    <input type="text" style={{ width: "300px" }} />
                  </div>
                  <button onClick={() => console.log("Saved")}>Save!</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ChakraBaseProvider>
  );
};

export default GoogleSidebar;
