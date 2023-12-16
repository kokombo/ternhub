import Link from "next/link";

const NavLinks = () => {
  return (
    <ul className="flex flex-col md:flex-row items-center gap-[38px]">
      <li>
        <Link
          href={"/jobs"}
          aria-label="internships page link"
          className="text-sm lg:text-base tracking-[0.5%] hover:text-purple "
        >
          Jobs
        </Link>
      </li>

      <li>
        <Link
          href={"/blogs"}
          aria-label="blogs page link"
          className="text-sm lg:text-base tracking-[0.5%] hover:text-purple "
        >
          Blogs
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
