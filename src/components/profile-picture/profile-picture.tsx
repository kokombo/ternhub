import Image from "next/image";
import { useSession } from "next-auth/react";

const ProfilePicture = () => {
  const { data: session } = useSession();

  return (
    <div className="h-12 w-12 rounded-full bg-purple flex items-center justify-center">
      {session?.user?.image ? (
        <Image
          alt="profile picture"
          src={session.user.image}
          height={48}
          width={48}
        />
      ) : (
        <p className="text-2xl text-white uppercase">
          {session?.user?.name?.substring(0, 1)}
        </p>
      )}
    </div>
  );
};

export default ProfilePicture;
