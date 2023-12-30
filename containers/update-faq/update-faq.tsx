"use client";

import { useEffect, useState } from "react";
import { CustomError, FaqForm, TailSpinLoader } from "@/components";
import { getFaqById } from "@/utilities/data-fetching/getFaqById";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setModalVisible } from "@/redux-toolkit/slices/modal";

type Props = {
  faqId: string;
};

const UpdateFaq = (props: Props) => {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  let prevFaqFetchingErrorResponse: any;

  const {
    isLoading: prevFaqFetchingLoading,
    faq,
    isError: prevFaqFetchingIsError,
    error: prevFaqFetchingError,
  } = getFaqById(props.faqId);

  if (prevFaqFetchingError) prevFaqFetchingErrorResponse = prevFaqFetchingError;

  const [faqAnswer, setFaqAnswer] = useState("");

  useEffect(() => {
    setFaqAnswer(faq?.answer as string);
  }, [faq?._id]);

  const updateFaqRequest = async (faqData: FaqData) => {
    return await axios.patch(`/api/faq/${props.faqId}`, faqData);
  };

  const {
    isLoading: updateFaqLoading,
    mutateAsync,
    isError: isFaqUpdateError,
    error: faqUpdateError,
  } = useMutation(updateFaqRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("getAllFaqs");

      dispatch(setModalVisible(false));
    },
  });

  const initiateUpdateFaqData = async (values: FaqFormType) => {
    const newFaqData = { ...values, answer: faqAnswer };

    await mutateAsync(newFaqData);
  };

  return (
    <div className="relative">
      {prevFaqFetchingLoading && (
        <span className="absolute h-full w-full top-0 left-0 flex items-center justify-center">
          <TailSpinLoader />
        </span>
      )}

      {prevFaqFetchingIsError && (
        <CustomError
          message={prevFaqFetchingErrorResponse?.response?.data?.message}
        />
      )}

      <FaqForm
        title="Edit Faq"
        initialValues={{
          question: faq?.question as string,
        }}
        submitForm={initiateUpdateFaqData}
        isLoading={updateFaqLoading}
        error={faqUpdateError}
        buttonLabel="Update Faq"
        textEditorOnchange={setFaqAnswer}
        textEditorValue={faqAnswer}
        isError={isFaqUpdateError}
      />
    </div>
  );
};

export default UpdateFaq;
