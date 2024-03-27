import {
  createBrain,
  createIndex,
  createUser,
  getUser,
  insertUserBrain,
} from "..";

export const CreateUser = async ({
  email,
  name,
  profileImageUrl = "",
}): Promise<string> => {
  const response = await getUser({ email });
  if (response?.id) return new Promise((resolve) => resolve(response?.id));
  const { id: newUserId } = await createUser({
    email,
    name,
    profileImageUrl,
    password: "1234",
  });
  const { id: defaultBrainId } = await createBrain({ name: "default" });
  await insertUserBrain({
    userId: newUserId,
    brainId: defaultBrainId,
  });
  await createIndex({
    userId: newUserId,
    brainId: defaultBrainId,
  });
  return new Promise((resolve) => resolve(newUserId));
};
