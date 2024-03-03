import iconBase64 from "data-base64:~assets/icon.png";
import cssText from "data-text:~/contents/google-sidebar.css";
import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    document.body.classList.toggle("plasmo-google-sidebar-show", isOpen);
  }, [isOpen]);

  return (
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
                Close
              </button>
              Hello There! Whant do you want to save now ?
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleSidebar;
