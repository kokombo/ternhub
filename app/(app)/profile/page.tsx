"use client";

import { useSession } from "next-auth/react";
import { UploadProfilePicture } from "@/components";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <main className="padding grid place-items-center">
      <section className="flex_center gap-8">
        <UploadProfilePicture />

        <div className="flex flex-col gap-4">
          <span className="flex gap-4 items-center max-w-[90vw]">
            <label className="lg:text-lg text-base text-textblack">Name:</label>

            {session?.user.name && (
              <input
                defaultValue={session.user.name}
                disabled
                className="w-[525px] py-[14px] px-4 rounded-[5px] border-[1px] border-gray outline-none"
              />
            )}
          </span>

          <span className="flex gap-4 items-center max-w-[90vw]">
            <label className="lg:text-lg text-base text-textblack">
              Email:
            </label>

            {session?.user.email && (
              <input
                defaultValue={session.user.email}
                disabled
                className="w-[525px] py-[14px] px-4 rounded-[5px] border-[1px] border-gray outline-none"
              />
            )}
          </span>
        </div>
      </section>
    </main>
  );
};

export default Profile;
