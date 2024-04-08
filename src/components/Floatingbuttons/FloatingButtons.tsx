import { Storage } from "@plasmohq/storage";
import { usePort } from "@plasmohq/messaging/hook";
import { GistrrIcon } from "../Icons/gistrrlogo";

export const FloatingButtons = ({ hideFloatingButtons }) => {
  const port = usePort("panel");
  const storage = new Storage();

  const handleBookmarkButtonClick = async () => {
    port.send({ action: "toggle-panel-state" });
    storage.set("openBookmarkModal", true);
    storage.set("bookmark-page-url", window.location.href);
    storage.set("bookmark-page-title", document.title);
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
        {/* <BookmarkIcon /> */}
        <GistrrIcon />
      </div>
    </div>
  );
};
