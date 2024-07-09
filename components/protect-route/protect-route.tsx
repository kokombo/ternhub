import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BarsLoader from "../bars-loader.tsx/bars-loader";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/auth/signin");
    },
  });

  return status === "loading" ? <BarsLoader /> : children;
};

export default ProtectRoute;
