import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithCredential,
} from "firebase/auth";

import { firebaseApp } from "../../util/firebase_config";
import { Storage } from "@plasmohq/storage";

import type { PlasmoMessaging } from "@plasmohq/messaging";

const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence);

export function startAuth(interactive) {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    if (chrome.runtime.lastError && !interactive) {
      console.log("It was not possible to get a token programmatically.");
    } else if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else if (token) {
      const credential = GoogleAuthProvider.credential(null, token);
      signInWithCredential(auth, credential)
        .then((result) => {
          console.log("Success!!!");
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("The OAuth token was null");
    }
  });
}

export function startSignIn() {
  const user = auth.currentUser;
  if (user) {
    auth.signOut();
  } else {
    startAuth(true);
  }
}

export const signin = async (req, res, storage) => {
  onAuthStateChanged(auth, async (user) => {
    if (user != null) {
      await storage.set("user", user);
      await res.send({ user });
    } else {
      startSignIn();
    }
  });
};

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const action = req.body.action;
  const storage = new Storage();
  const user = await storage.get("user");
  if (user) {
    res.send({ user });
  } else {
    switch (action) {
      case "signin":
        signin(req, res, storage);
        break;
      case "signout":
        auth.signOut();
        await storage.remove("user");
        res.send({ user: null });
        break;
      default:
        res.send("Invalid action!");
        break;
    }
  }
};

export default handler;
