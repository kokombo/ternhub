import { getServerSession } from "next-auth";
import { authOptions } from "..";

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions);

  const sessionUser = session?.user;

  const userId = sessionUser?.id;

  return { userId, sessionUser };
};

//This is serverSessionUser
