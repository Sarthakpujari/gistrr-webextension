import { signin } from "./messages/auth";
// @ts-ignore
signin();

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
