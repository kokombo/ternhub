"use client";

import { BlogForm } from "@/components";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetBlogBySlug } from "@/utilities/data-fetching/getBlogBySlug";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const EditBlogInfo = () => {
  const { slug } = useParams();

  const router = useRouter();

  const queryClient = useQueryClient();

  const { blog } = useGetBlogBySlug(slug);

  const initialFormValues: BlogFormType = {
    title: blog?.title !== undefined ? blog?.title : "",

    image: blog?.image !== undefined ? blog?.image : "",

    metaDescription:
      blog?.metaDescription !== undefined ? blog?.metaDescription : "",

    author: {
      name: blog?.author.name !== undefined ? blog?.author.name : "",

      twitter: blog?.author.twitter !== undefined ? blog?.author.twitter : "",

      portfolio:
        blog?.author.portfolio !== undefined ? blog?.author.portfolio : "",

      linkedin:
        blog?.author.linkedin !== undefined ? blog?.author.linkedin : "",
    },

    category: blog?.category !== undefined ? blog?.category : "",
  };

  const [content, setContent] = useState(blog?.content || "");

  const updateBlogRequest = async (newBlogData: BlogData) => {
    const res = await axios.patch(`/api/blog/${slug}`, newBlogData);
    return res.data;
  };

  const { mutateAsync, isLoading, isError, error } = useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    BlogData
  >(
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
