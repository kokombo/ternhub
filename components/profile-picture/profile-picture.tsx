"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ProfilePicture = () => {
  const { data: session } = useSession();

  return (
    <Link
      href="/profile"
      className="h-12 w-12 rounded-full bg-purple flex items-center justify-center"
    >
      {session?.user?.image ? (
        <span className="block relative h-full w-full">
          <Image
            alt="profile picture"
            src={session.user.image}
            fill
            className="rounded-full object-cover"
            quality={100}
            sizes="100vw 80vw"
          />
        </span>
      ) : (
        <p className="text-2xl text-white uppercase">
          {session?.user?.name?.substring(0, 1)}
        </p>
      )}
    </Link>
  );
};

export default ProfilePicture;
