import { BlogsList } from "@/containers";

const AdminBlogsListPage = () => {
  return (
    <div className="flex flex-col py-11 lg:py-[50px] sm:px-[6.94%] px-5 gap-[25px] ">
      <h1 className="text-[28px] font-medium self-center">Manage All Blogs</h1>
      <BlogsList rootUrl="/admin/blogs" />
    </div>
  );
};

export default AdminBlogsListPage;
