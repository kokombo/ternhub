"use client";

import Link from "next/link";
import { NavLinks, Copyright } from "@/components";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session } = useSession();

  return (
    <footer className="footer">
      <div className="footer_text_wrapper">
        <article className="footer_container_1">
          <h3 className="text-[20px] lg:text-[32px] text-white">TheTernHub</h3>

          {/* <Logo /> */}

          <p className="footer_text">
            Explore a world of thrilling internships in the tech industry and
            take the first step towards launching your dream career.
          </p>
        </article>

        <article className="flex flex-col md:flex-row items-center gap-[38px]">
          <NavLinks />

          {/* {session?.user.role === "admin" && } */}

          <Link
            href="/admin"
            className="hover:text-purple lg:text-base text-sm text-white"
          >
            Admin
          </Link>
        </article>
      </div>

      <div className="self-center">
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
