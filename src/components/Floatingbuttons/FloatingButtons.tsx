import { sendToBackground } from "@plasmohq/messaging";
import { BookmarkIcon } from "../Icons/BookmarkIcon";

export const FloatingButtons = ({
  setOpenBookmarkModal,
  hideFloatingButtons,
}) => {
  const handleBookmarkButtonClick = async () => {
    setOpenBookmarkModal(true);
  };

  if (hideFloatingButtons) return null;
  return (
    <div
      style={{
        boxSizing: "border-box",
        position: "fixed",
        right: "0.1rem",
        top: "15rem",
        zIndex: 1000,
      }}
    >
      <div
        onClick={handleBookmarkButtonClick}
        style={{
          backgroundColor: "#fff",
          borderRadius: "50%",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          height: "3rem",
          width: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "background-color 0.3s",
        }}
      >
        <BookmarkIcon />
      </div>
    </div>
  );
};
