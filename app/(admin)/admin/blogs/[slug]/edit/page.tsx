"use client";
import { BlogForm } from "@/components";
import { useState } from "react";
import { useParams } from "next/navigation";
import { getBlogBySlug } from "@/utilities/data-fetching/getBlogBySlug";

const EditBlogInfo = () => {
  const { slug } = useParams();

  const { blog } = getBlogBySlug(slug);

  const initialFormValues: BlogFormType = {
    title: blog?.title as string,
    image: blog?.image as string,
    metaDescription: blog?.metaDescription as string,
    author: blog?.author as string,
    twitter: blog?.title as string,
    portfolio: blog?.portfolio as string,
    linkedin: blog?.linkedin as string,
    category: blog?.category as string,
  };

  const [content, setContent] = useState(blog?.content as string);

  const previewBlog = async () => {};

  return (
    <BlogForm
      initialFormValues={initialFormValues}
      title="Update Blog Info"
      submitForm={previewBlog}
      textEditorValue={content}
      textEditorOnchange={setContent}
      isLoading={false}
      isError={false}
      error={"A"}
      buttonLabel="Preview Update"
    />
  );
};

export default EditBlogInfo;
