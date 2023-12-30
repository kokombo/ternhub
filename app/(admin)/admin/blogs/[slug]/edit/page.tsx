"use client";

import { BlogForm } from "@/components";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlogBySlug } from "@/utilities/data-fetching/getBlogBySlug";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const EditBlogInfo = () => {
  const { slug } = useParams();

  const router = useRouter();

  const queryClient = useQueryClient();

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

  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(blog?.content as string);
  }, [slug]);

  const updateBlogRequest = async (newBlogData: BlogData) => {
    return await axios.patch(`/api/blog/${slug}`, newBlogData);
  };

  const { mutateAsync, isLoading, isError, error } = useMutation(
    updateBlogRequest,

    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetchBlogs");

        router.push("/admin/blogs");
      },
    }
  );

  const previewBlog = async (values: BlogFormType) => {
    const newBlogData = { ...values, content };

    await mutateAsync(newBlogData);
  };

  return (
    <BlogForm
      initialFormValues={initialFormValues}
      title="Update Blog Info"
      submitForm={previewBlog}
      textEditorValue={content}
      textEditorOnchange={setContent}
      isLoading={isLoading}
      isError={isError}
      error={error}
      buttonLabel="Update Blog"
    />
  );
};

export default EditBlogInfo;
