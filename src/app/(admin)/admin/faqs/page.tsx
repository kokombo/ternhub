"use client";

import { Fragment, useState } from "react";
import { useGetAllFaqs } from "@/utilities/data-fetching/getAllFaqs";
import FaqSkeletonLoader from "@/utilities/skeletons/faq-skeleton-loader";
import { FaqCard } from "@/components";
import { useSelector, useDispatch } from "react-redux";
import type { DispatchType, StateType } from "@/redux-toolkit/store";
import { setModalVisible } from "@/redux-toolkit/slices/modal";
import { UpdateFaq } from "@/containers";
import dynamic from "next/dynamic";

const UniversalModal = dynamic(
  () => import("@/components/universal-modal/universal-modal"),
  { ssr: false }
);

const AdminAllFaqsPage = () => {
  const dispatch: DispatchType = useDispatch();

  const { isLoading, isError, faqs } = useGetAllFaqs();
  const { modalVisible } = useSelector((state: StateType) => state.modal);
  const [currentFaqId, setCurrentFaqId] = useState("");

  const startFaqEdit = (id: string) => {
    dispatch(setModalVisible(true));
    setCurrentFaqId(id);
  };

  return (
    <Fragment>
      {modalVisible && (
        <UniversalModal>
          <UpdateFaq faqId={currentFaqId} />
        </UniversalModal>
      )}

      <div className="flex items-center justify-center w-full py-11 lg:py-[100px]">
        <div className="grid grid-cols-1 lg:gap-10 gap-6 w-full place-items-center max-w-[630px]">
          {isLoading || isError
            ? [...Array(4)].map((_, index) => (
                <FaqSkeletonLoader key={index.toString()} />
              ))
            : faqs?.map((faq) => (
                <FaqCard
                  key={faq._id}
                  props={faq}
                  onClickFaqEditButton={startFaqEdit}
                />
              ))}
        </div>
      </div>
    </Fragment>
  );
};

export default AdminAllFaqsPage;
