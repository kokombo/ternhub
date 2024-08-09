"use client";

import { Logo, NavLinks, StyledLink, ProfilePicture } from "@/components";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { icons } from "@/constants";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import Sidebar from "../sidebar/sidebar";
import type { Session } from "next-auth";

const NavigationBar = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const openSidebar = () => setSidebarIsOpen(true);
  const closeSidebar = () => setSidebarIsOpen(false);

  return (
    <Fragment>
      <nav className="nav_container">
        <Logo />

        {pathname.includes("/search") ? null : (
          <span className="text-greyblack hidden lg:inline ">
            <NavLinks />
          </span>
        )}

        <div className="flex items-center gap-[14px]">
          {session ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
                className="lg:inline hidden text-base text-greyblack"
              >
                Sign out
              </button>
              <ProfilePicture />
            </div>
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
            onClick={() => {
              openSidebar();
              document.body.style.overflow = "hidden";
            }}
            className="nav_toggle"
          >
            <Image
              src={icons.toggle}
              alt="toggle icon"
              height={24}
              width={24}
            />
          </button>
        </div>
      </nav>

      <Sidebar sidebarIsOpen={sidebarIsOpen} closeSidebar={closeSidebar} />
    </Fragment>
  );
};

export default NavigationBar;
