import { ThreeDots } from "react-loader-spinner";
import { Logo } from "..";

const Loader = () => {
  return (
    <div className="h-screen flex flex-col items-center lg:pt-[200px] gap-2">
      <div className="flex flex-col items-center gap-[2px] jus ">
        <Logo />
        <p>is loading...</p>
      </div>

      <ThreeDots
        height="70"
        width="90"
        radius="9"
        color="#5627FF"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default Loader;
