"use client";
import { useState } from "react";
import { useGetAllFaqs } from "@/utilities/data-fetching/getAllFaqs";
import FaqSkeletonLoader from "@/utilities/skeletons/faq-skeleton-loader";
import { UniversalModal, FaqCard } from "@/components";
import { useSelector, useDispatch } from "react-redux";
import type { DispatchType, StateType } from "@/redux-toolkit/store";
import { setModalVisible } from "@/redux-toolkit/slices/modal";
import { UpdateFaq } from "@/containers";
import { v4 as uuid } from "uuid";

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
    <>
      {modalVisible && (
        <UniversalModal>
          <UpdateFaq faqId={currentFaqId} />
        </UniversalModal>
      )}

      <div className="flex items-center justify-center w-full py-11 lg:py-[100px]">
        <div className="grid grid-cols-1 lg:gap-10 gap-6 w-full place-items-center max-w-[630px]">
          {isLoading || isError
            ? [...Array(4)].map((_) => <FaqSkeletonLoader key={uuid()} />)
            : faqs?.map((faq) => (
                <FaqCard
                  key={faq._id}
                  props={faq}
                  onClickFaqEditButton={startFaqEdit}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default AdminAllFaqsPage;
