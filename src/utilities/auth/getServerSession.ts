import { authOptions } from "./authOptions";
import { getServerSession as getSession } from "next-auth";

export const getServerSession = async () => {
  const session = await getSession(authOptions);
  return session;
};
