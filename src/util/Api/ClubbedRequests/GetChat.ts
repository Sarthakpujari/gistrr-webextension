import {
    getBrainChat as getBrainChatFromAPI,
    getBrainNotif as getBrainNotifFromAPI
  } from "~src/util/Api";


export const getChatAndNotif = async (userId, currentBrainId) => {
  console.log("userId>>>", userId)
  console.log("currentBrainId>>>", currentBrainId)
    const chatData = await getBrainChatFromAPI({
        receiverUserId: userId,
        senderUserId: currentBrainId,
        lastCursor: 10000,
        pageSize: 100,
      });

      const notifData = await getBrainNotifFromAPI({
        receiverUserId: currentBrainId,
        lastCursor: 10000,
        pageSize: 100,
      });
      return {chatData, notifData}

} 


