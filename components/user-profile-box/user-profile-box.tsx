"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const UserProfileBox = () => {
  const { data: session } = useSession();

  return (
    <div>
      <p>{session?.user.name} </p>

      <div>Upload profile picture </div>

      <div>View profile picture </div>

      <button
        type="button"
        onClick={() => {
          signOut({ callbackUrl: "/auth/signin" });
        }}
        className="signup_button"
      >
        Log out
      </button>
    </div>
  );
};

export default UserProfileBox;
