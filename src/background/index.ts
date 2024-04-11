import { Storage } from "@plasmohq/storage";
import { signin } from "./messages/auth";
// @ts-ignore
signin();

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

const storage = new Storage();

const setUrlTitleToStorage = async (url, title) => {
  await storage.set("bookmark-page-url", url);
  await storage.set("bookmark-page-title", title);

  const r1 = await storage.get("bookmark-page-url");
  const r2 = await storage.get("bookmark-page-title");
  console.log("r1 >>> ", r1);
  console.log("r2 >>> ", r2);
};

(async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  const { title, url } = tab;
  setUrlTitleToStorage(url, title);
})();

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.active) {
    const { title, url } = tab;
    setUrlTitleToStorage(url, title);
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.active) {
    const { title, url } = tab;
    setUrlTitleToStorage(url, title);
  }
});
