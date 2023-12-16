"use client";
import { Logo, NavLinks, StyledLink, ProfilePicture } from "@/components";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { icons } from "@/constants";

type Props = {
  openSidebar: () => void;
};

const NavigationBar = (props: Props) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div></div>;
  }

  return (
    <nav className="nav_container">
      <Logo />

      <span className="text-greyblack hidden lg:inline ">
        <NavLinks />
      </span>

      <div className="flex items-center gap-[14px]">
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

        <button
          type="button"
          onClick={props.openSidebar}
          className="inline md:hidden text-black"
        >
          <Image src={icons.toggle} alt="toggle icon" height={24} width={24} />
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
