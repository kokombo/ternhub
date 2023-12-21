"use client";
import { BlogForm } from "@/components";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
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

interface BlogData extends BlogFormType {
  content: string;
}

const AddABlog = () => {
  const [content, setContent] = useState("");

  const params = new URLSearchParams({
    key: process.env.PREVIEW_MODE_SECRET_TOKEN as string,
    redirect: "/admin/add-blog/preview",
  });

  const router = useRouter();

  const previewBlogRequest = async (blogData: BlogData) => {
    return await axios.post(`/api/preview?${params}`, blogData);
  };

  const { mutateAsync, isLoading, isError, error, isSuccess } =
    useMutation(previewBlogRequest);

  const previewBlog = async (values: BlogFormType) => {
    const blogData = { ...values, content };

    await mutateAsync(blogData);

    if (isSuccess) {
      router.push("/admin/add-blog/preview");
    }
  };

  return (
    <BlogForm
      initialFormValues={initialFormValues}
      title="Post a Blog"
      submitForm={previewBlog}
      textEditorValue={content}
      textEditorOnchange={setContent}
      isLoading={isLoading}
      isError={isError}
      error={error}
      buttonLabel="Preview Blog"
    />
  );
};

export default AddABlog;
