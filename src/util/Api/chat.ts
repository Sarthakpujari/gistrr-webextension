import axios from "axios";

export const backendUrl = "http://127.0.0.1:5000";

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
    return new Promise((resolve) => resolve(res.data.response));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const createIndex = async (params: {
  userId: string;
  brainId: string;
}): Promise<{ msg: string }> => {
  const payload = {
    brain_id: params.brainId,
    user_id: params.userId,
  };
  try {
    const res = await axios.post(`${backendUrl}/create_index`, payload);
    return new Promise((resolve) => resolve(res.data.message));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};
