import { BlogInfoPage } from "@/containers";

const PreviewBlogBeforePublish = ({ data }: { data: BlogType }) => {
  return (
    <div>
      <BlogInfoPage data={data} />
    </div>
  );
};

export default PreviewBlogBeforePublish;

// export const getServerSideProps = async (context: any) => {
//   return {
//     props: {
//       data: context.previewData,
//     },
//   };
// };
