import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { UploadProfilePicture } from "..";

const UserProfileBox = () => {
  const { data: session } = useSession();

  return (
    <div>
      <p>{session?.user.name} </p>

      <UploadProfilePicture />

      <div>View profile picture </div>

      <button
        type="button"
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
        className="signup_button"
      >
        Log out
      </button>
    </div>
  );
};

export default UserProfileBox;
