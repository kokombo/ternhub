import { AdminToolBox } from "@/components";
import { BlogInfoPage } from "@/containers";

const AdminBlogInfoPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="py-11 ">
      <div className="flex flex-start sm:px-[6.94%] px-5">
        <AdminToolBox
          editButtonLabel="Edit Blog"
          editButtonUrl={`/admin/blogs/${params.slug}/edit`}
          deleteButtonLabel="Delete Blogs"
          deleteButtonOnclick={() => {}}
        />
      </div>

      <BlogInfoPage slug={params.slug} rootUrl="/admin/blogs" />
    </div>
  );
};

export default AdminBlogInfoPage;
