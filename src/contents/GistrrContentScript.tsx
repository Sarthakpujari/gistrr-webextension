import { createContext, useEffect, useState } from "react";
import { Storage } from "@plasmohq/storage";
import { FloatingButtons } from "../components/Floatingbuttons";
import cssText from "data-text:~/contents/GistrrContentScript.css";

import type { UserContextType } from "~src/type";
import type { PlasmoCSConfig, PlasmoGetShadowHostId } from "plasmo";

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

  return (
    <>
      {/* <BookmarkInput
          openBookmarkModal={openBookmarkModal}
          setOpenBookmarkModal={setOpenBookmarkModal}
          brainList={brainList}
        /> */}
      {openBookmarkModal && (
        <div className="cssText.floatingContainer">
          <div className="modal-content">
            <button
              className="close-modal-button"
              onClick={() => setOpenBookmarkModal(false)}
            >
              Close
            </button>
            <h2>Modal Content</h2>
            <p>This is the content of the modal.</p>
          </div>
        </div>
      )}
      <FloatingButtons
        setOpenDrawer={setOpenDrawer}
        setOpenBookmarkModal={setOpenBookmarkModal}
        hideFloatingButtons={hideFloatingButtons}
      />
    </>
  );
};

export default GoogleSidebar;
