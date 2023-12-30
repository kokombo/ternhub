"use client";
import { Logo, NavLinks, StyledLink, ProfilePicture } from "@/components";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { icons } from "@/constants";
import { usePathname } from "next/navigation";

type Props = {
  openSidebar: () => void;
};

const NavigationBar = (props: Props) => {
  const { status } = useSession();

  const pathname = usePathname();

  if (status === "loading") return <div></div>;

  return (
    <nav className="nav_container">
      <Logo />

      {pathname.includes("/search") ? null : (
        <span className="text-greyblack hidden lg:inline ">
          <NavLinks />
        </span>
      )}

      <div className="flex items-center gap-[14px]">
        {status === "authenticated" ? (
          <ProfilePicture />
        ) : (
          <div className="flex items-center gap-[10px] ">
            <Link
              href="/auth/signin"
              arial-label="Link to the signin page"
              className="text-base font-semibold text-purple hidden lg:inline"
            >
              Log in
            </Link>

            <StyledLink
              label="Sign up"
              url="/auth/signup"
              arialabel="Link to the signup page"
              extraClasses="signup_button"
            />
          </div>
        )}

        <button
          type="button"
          onClick={props.openSidebar}
          className="nav_toggle"
        >
          <Image src={icons.toggle} alt="toggle icon" height={24} width={24} />
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
