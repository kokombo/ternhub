import Link from "next/link";
import { NavLinks, Copyright } from "@/components";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="flex_center lg:flex-row gap-5 lg:items-start justify-between w-full">
        <article className="flex flex-col">
          <h3 className="text-[20px] lg:text-[32px] text-white ">TheTernHub</h3>

          {/* <Logo /> */}

          <p className="max-w-[520px] text-white text-sm lg:text-lg mt-6">
            Explore a world of thrilling internships in the tech industry and
            take the first step towards launching your dream career.
          </p>
        </article>

        <article className="flex flex-col md:flex-row items-center gap-[38px]">
          <NavLinks />

          <Link
            href="/"
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
