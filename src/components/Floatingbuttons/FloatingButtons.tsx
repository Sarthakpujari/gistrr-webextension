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
      <div
        onClick={() => setOpenBookmarkModal(true)}
        className="floating-button"
      >
        <BookmarkIcon />
      </div>
    </div>
  );
};
