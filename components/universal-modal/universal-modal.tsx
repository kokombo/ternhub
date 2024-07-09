import { FaTimesCircle } from "react-icons/fa";
import { setModalVisible } from "@/redux-toolkit/slices/modal";
import { useDispatch } from "react-redux";
import type { DispatchType } from "@/redux-toolkit/store";

type Props = {
  children: React.ReactNode;
};

const UniversalModal = (props: Props) => {
  const dispatch: DispatchType = useDispatch();

  return (
    <div className="fixed top-0 left-0 flex items-center md:justify-center w-full h-full bg-black md:px-0 px-5 z-[1000] bg-modalblack">
      <div className="bg-white md:w-[700px] w-full z-1 h-[500px] p-5 overflow-y-scroll rounded-[10px]">
        <button
          type="button"
          onClick={() => dispatch(setModalVisible(false))}
          className="text-red float-right text-2xl"
        >
          <FaTimesCircle />
        </button>

        <div className="mt-2 max-w-full">{props.children}</div>
      </div>
    </div>
  );
};

export default UniversalModal;
