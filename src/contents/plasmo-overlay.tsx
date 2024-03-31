import cssText from "data-text:~/contents/plasmo-overlay.css";
import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
};

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const PlasmoOverlay = () => {
  // return (
  //   <div
  //     style={{
  //       position: "fixed",
  //       top: 0,
  //       left: 0,
  //       width: "100%",
  //       height: "100%",
  //       backgroundColor: "rgba(0, 0, 0, 0.5)",
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //     }}
  //   >
  //     <div
  //       style={{
  //         backgroundColor: "white",
  //         padding: "20px",
  //         borderRadius: "5px",
  //         boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  //       }}
  //     >
  //       <button
  //         style={{
  //           position: "absolute",
  //           top: "10px",
  //           right: "10px",
  //           backgroundColor: "#ff0000",
  //           color: "white",
  //           border: "none",
  //           cursor: "pointer",
  //         }}
  //         onClick={() => {}}
  //       >
  //         Close
  //       </button>
  //       <h2>Modal Content</h2>
  //       <p>This is the content of the modal.</p>
  //     </div>
  //   </div>
  // );
};

export default PlasmoOverlay;
