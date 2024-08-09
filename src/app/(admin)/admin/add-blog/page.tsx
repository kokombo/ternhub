"use client";

import { BlogForm } from "@/components";
import { useState } from "react";
import axios, { type AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";

const initialFormValues: BlogFormType = {
  title: "",
  image: "",
  metaDescription: "",
  author: {
    name: "Admin",
    twitter: "",
    portfolio: "",
    linkedin: "",
  },
  category: "",
};

const AddABlog = () => {
  const [content, setContent] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const addABlogRequest = async (blogData: BlogData) => {
    const res = await axios.post("/api/blog", blogData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.data;
  };

  const { mutateAsync, isLoading, isError, error } = useMutation<
    BlogType,
    AxiosError<ErrorResponse>,
    BlogData
  >("addABlog", addABlogRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchBlogs");
      router.push("/admin/blogs");
    },
  });

  const addABlog = async (values: BlogFormType) => {
    const blogData = { ...values, content };
    await mutateAsync(blogData);
  };

  return (
    <BlogForm
      initialFormValues={initialFormValues}
      title="Post a Blog"
      submitForm={addABlog}
      textEditorValue={content}
      textEditorOnchange={setContent}
      isLoading={isLoading}
      isError={isError}
      error={error}
      buttonLabel="Post Blog"
    />
  );
};

export default AddABlog;
