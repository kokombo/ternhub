import { authOptions } from "./authOptions";
import { getServerSession } from "next-auth";

export const getCurrentServerSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
