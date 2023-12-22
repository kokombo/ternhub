import Link from "next/link";

const AdminSegmentNavbar = () => {
  return (
    <nav className="admin_segment_navbar">
      <Link href="." className="hover:text-purple">
        Dashboard
      </Link>

      <div className="admin_navlinks_container">
        <Link
          href="/admin/jobs"
          aria-label="admin link to view all jobs"
          className="hover:text-purple"
        >
          Manage All Jobs
        </Link>

        <Link
          href="/admin/blogs"
          aria-label="admin link to view all blogs"
          className="hover:text-purple"
        >
          Manage All Blogs
        </Link>

        <Link
          href="/admin/post-job"
          aria-label="admin link to post a job page"
          className="bg-purple hover:bg-blue lg:px-8 px-4 py-3 rounded-[10px] text-white font-semibold text-sm lg:text-base text-center "
        >
          Post A Job
        </Link>

        <Link
          href="/admin/add-blog"
          aria-label="admin link to add a blog page"
          className="bg-purple hover:bg-blue  lg:px-8 px-4 py-3 rounded-[10px] text-white font-semibold text-sm lg:text-base text-center"
        >
          Post A Blog
        </Link>

        <Link
          href="/admin/add-faq"
          aria-label="admin link to post a job page"
          className="bg-purple hover:bg-blue lg:px-8 px-4 py-3 rounded-[10px] text-white font-semibold text-sm lg:text-base text-center "
        >
          Add A FAQ
        </Link>
      </div>

      <Link
        href="/jobs"
        aria-label="admin link to exit admin segment for app segment"
        className="bg-purple hover:bg-blue lg:px-8 px-4 py-3 rounded-[10px] text-white font-semibold text-sm lg:text-base text-center"
      >
        Exit Admin
      </Link>
    </nav>
  );
};

export default AdminSegmentNavbar;
