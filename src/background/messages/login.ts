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
  console.log("Auth trying");
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
          console.log(error);
        });
    } else {
      console.error("The OAuth token was null");
    }
  });
}

export function startSignIn() {
  console.log("started SignIn");
  const user = auth.currentUser;
  if (user) {
    console.log("current");
    console.log(user);
    auth.signOut();
  } else {
    console.log("proceed");
    startAuth(true);
  }
}

export const signin = async (req, res, storage) => {
  onAuthStateChanged(auth, async (user) => {
    if (user != null) {
      console.log("logged in!");
      console.log("current");
      console.log(user);
      await storage.set("user", user);
      await res.send({ user });
    } else {
      console.log("No user");
      startSignIn();
    }
  });
};

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("req >>> ", req);
  const action = req.body.action;
  const storage = new Storage();
  const user = await storage.get("user");
  if (user) {
    console.log("login not required");
    res.send({ user });
  } else {
    switch (action) {
      case "login":
        console.log("login required");
        signin(req, res, storage);
        break;
      default:
        res.send("Invalid action!");
        break;
    }
  }
};

export default handler;
