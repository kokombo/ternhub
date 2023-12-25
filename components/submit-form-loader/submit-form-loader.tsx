import { ThreeDots } from "react-loader-spinner";

const SubmitFormLoader = () => {
  return (
    <div className="bg-grey w-full rounded-[10px] flex items-center justify-center ">
      <ThreeDots
        height="56"
        width="80"
        radius="9"
        color="#5627FF"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default SubmitFormLoader;
