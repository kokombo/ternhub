import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grotesk, Sans } from "../../app/font";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col md:flex-row items-center gap-[38px]">
      <li>
        <Link
          href={"/jobs"}
          aria-label="internships page link"
          className={`${
            pathname.includes("/jobs") ? "text-purple" : ""
          } text-sm lg:text-base tracking-[0.5%]`}
        >
          Jobs
        </Link>
      </li>

      <li>
        <Link
          href={"/blogs"}
          aria-label="blogs page link"
          className={`${
            pathname.includes("/blogs") ? "text-purple" : ""
          } text-sm lg:text-base tracking-[0.5%] font-sans `}
        >
          Blogs
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
