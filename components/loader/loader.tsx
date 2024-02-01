import { ThreeDots } from "react-loader-spinner";
import { Logo } from "..";

const Loader = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center lg:justify-normal lg:pt-[200px] gap-2 bg-[#000000]">
      <Logo />

      <ThreeDots
        height="50"
        width="60"
        radius="6"
        color="#5627FF"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default Loader;
