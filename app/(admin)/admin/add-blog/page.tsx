"use client";

import { BlogForm } from "@/components";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";

const initialFormValues: BlogFormType = {
  title: "",
  image: "",
  metaDescription: "",
  author: "Admin",
  twitter: "",
  portfolio: "",
  linkedin: "",
  category: "",
};

const AddABlog = () => {
  const [content, setContent] = useState("");

  const router = useRouter();

  const queryClient = useQueryClient();

  const addABlogRequest = async (blogData: BlogData) => {
    return await axios.post("/api/blog", blogData);
  };

  const { mutateAsync, isLoading, isError, error } = useMutation(
    addABlogRequest,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetchBlogs");

        router.push("/admin/blogs");
      },
    }
  );

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
