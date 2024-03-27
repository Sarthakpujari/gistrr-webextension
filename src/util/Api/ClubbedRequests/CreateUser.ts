import { createBrain, createIndex, createUser, insertUserBrain } from "..";

export const CreateUser = async ({ email, name, profileImageUrl = "" }) => {
  try {
    const { id: userId } = await createUser({
      email,
      name,
      profileImageUrl,
      password: "1234",
    });
    const { id: defaultBrainId } = await createBrain({ name: "default" });
    await insertUserBrain({
      userId,
      brainId: defaultBrainId,
    });
    await createIndex({
      userId,
      brainId: defaultBrainId,
    });
    return userId;
  } catch (error) {
    console.error(error);
    return null;
  }
};
