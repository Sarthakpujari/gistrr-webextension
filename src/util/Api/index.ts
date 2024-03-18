import axios from "axios";

const proxyUrl = "http://localhost:8000/data-proxy";

export const createUser = async (params: {
  email: string;
  name: string;
  profileImageUrl: string;
  password: string;
}): Promise<{ id: string }> => {
  const payload = {
    email: params.email,
    name: params.name,
    profile_image_url: params.profileImageUrl,
    password: params.password,
  };
  console.log("Payload:", payload);

  try {
    const res = await axios.post(`${proxyUrl}/insertuser`, payload);
    return new Promise((resolve) => resolve(res.data.insert_user_one));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const createBrain = async (params: {
  name: string;
}): Promise<{ id: string }> => {
  try {
    const res = await axios.post(`${proxyUrl}/insertbrain`, params);
    return new Promise((resolve) => resolve(res.data.insert_brain_one));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

export const insertUserBrain = async (params: {
  userId: string;
  brainId: string;
}): Promise<{ id: number }> => {
  const payload = {
    user_id: params.userId,
    brain_id: params.brainId,
  };
  try {
    const res = await axios.post(`${proxyUrl}/insertuserbrain`, payload);
    return new Promise((resolve) => resolve(res.data.insert_user_brain_one));
  } catch (error) {
    console.error("Error posting data:", error);
  }
};
