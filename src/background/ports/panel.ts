import type { PlasmoMessaging } from "@plasmohq/messaging";

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  const action = req.body.action;
  const windowId = req.port.sender.tab.windowId;

  if (action === "toggle-panel-state") {
    chrome.sidePanel.open({ windowId: windowId });
    res.send({ message: "Panel opened" });
  }
};

export default handler;
