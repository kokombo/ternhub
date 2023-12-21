"use client";
import { FaqForm } from "@/components";
import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialValues: FaqFormType = {
  question: "",
};

interface FaqData extends FaqFormType {
  answer: string;
}

const AddFaqPage = () => {
  const [answer, setAnswer] = useState("");

  const router = useRouter();

  const addFaqRequest = async (faqData: FaqData) => {
    return await axios.post("/api/faq", faqData);
  };

  const { mutateAsync, isLoading, isError, error, isSuccess } =
    useMutation(addFaqRequest);

  const submitFAQ = async (values: FaqFormType) => {
    const faqData = { ...values, answer };

    await mutateAsync(faqData);

    if (isSuccess) {
      router.push("/admin");
    }
  };

  return (
    <FaqForm
      title="Add FAQ"
      initialValues={initialValues}
      submitForm={submitFAQ}
      isLoading={isLoading}
      isError={isError}
      error={error}
      buttonLabel="Add Faq"
      textEditorValue={answer}
      textEditorOnchange={setAnswer}
    />
  );
};

export default AddFaqPage;
