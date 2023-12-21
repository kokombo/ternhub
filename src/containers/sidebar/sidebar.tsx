"use client";

import Image from "next/image";
import { Logo } from "@/components";
import { useSession, signOut } from "next-auth/react";
import { icons } from "@/constants";
import Link from "next/link";
import { useEffect } from "react";
import { useScreenSize } from "@/utilities/hooks";

type Props = {
  sidebarIsOpen: boolean;
  closeSidebar: () => void;
};

const Sidebar = (props: Props) => {
  const { data: session } = useSession();

  const { screenSize } = useScreenSize();

  useEffect(() => {
    if (screenSize && screenSize >= 1024) {
      props.closeSidebar();
    }
  }, [screenSize]);

  return (
    <aside
      className={` ${
        props.sidebarIsOpen ? "show_sidebar" : "hide_sidebar"
      } sidebar_wrapper`}
    >
      <div>
        <span className="float-right">
          <button type="button" onClick={() => props.closeSidebar()}>
            <Image src={icons.close} alt="toggle icon" height={24} width={24} />
          </button>
        </span>

        <div className="py-10 gap-4 flex flex-col">
          <Logo />

          <ul className="flex flex-col gap-3 ">
            <li className="list-none">
              <Link
                href="/jobs"
                aria-label="internships page link from sidebar"
                onClick={() => props.closeSidebar()}
              >
                Internships
              </Link>
            </li>

            <li className="list-none">
              <Link
                href="/blogs"
                aria-label="blogs page link from sidebar"
                onClick={() => props.closeSidebar()}
              >
                Blogs
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <>
        {session?.user ? (
          <button
            type="button"
            onClick={() => signOut()}
            className="signup_button self-center"
          >
            Sign Out
          </button>
        ) : (
          <Link
            href="/auth/signin"
            aria-label="sign in page link from sidebar"
            className="signup_button self-center"
          >
            Sign in
          </Link>
        )}
      </>
    </aside>
  );
};

export default Sidebar;
