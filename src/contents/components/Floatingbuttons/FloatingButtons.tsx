/**
 *
 * Chakra styles wont work here, the css for this file is written in GistrrContentScript.css
 */

import { BookmarkIcon } from "../Icons/BookmarkIcon";
import { PanelIcon } from "../Icons/PanelIcon";

export const FloatingButtons = ({
  setOpenDrawer,
  setOpenBookmarkModal,
  hideFloatingButtons,
}) => {
  if (hideFloatingButtons) return null;
  return (
    <div className="floating-container">
      <div className="floating-button-container">
        <div onClick={() => setOpenDrawer(true)} style={{ cursor: "pointer" }}>
          <PanelIcon />
        </div>
        <hr className="floating-button-separator" />
        <div
          onClick={() => setOpenBookmarkModal(true)}
          style={{ cursor: "pointer" }}
        >
          <BookmarkIcon />
        </div>
      </div>
    </div>
  );
};
