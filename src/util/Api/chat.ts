import axios from "axios";

const backendUrl = "http://127.0.0.1:5000";

export const chat = async ({
  userId,
  brainId,
  query,
}: {
  userId: string;
  brainId: string;
  query: string;
}) => {
  const payload = {
    user_id: userId,
    brain_id: brainId,
    query: query,
  };
  try {
    const res = await axios.post(`${backendUrl}/chat`, payload);
    return new Promise((resolve) => resolve(res.data));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};
