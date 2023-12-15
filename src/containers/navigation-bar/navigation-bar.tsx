"use client";

import { Logo, NavLinks, StyledLink, ProfilePicture } from "@/components";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { icons } from "@/constants";

const NavigationBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="nav_container">
      <Logo />

      <span className="text-greyblack hidden lg:block ">
        <NavLinks />
      </span>

      <>
        {!session?.user ? (
          <div className="flex items-center gap-[10px] ">
            <Link
              href="/auth/signin"
              arial-label="Link to the signin page"
              className="text-base font-semibold text-purple hidden lg:inline"
            >
              Log in
            </Link>

            <StyledLink
              label="sign up"
              url="/auth/signup"
              arialabel="Link to the signup page"
            />
          </div>
        ) : (
          <ProfilePicture />
        )}

        <button type="button" onClick={() => {}} className="hidden text-black">
          <Image src={icons.toggle} alt="toggle icon" height={24} width={24} />
        </button>
      </>
    </nav>
  );
};

export default NavigationBar;
