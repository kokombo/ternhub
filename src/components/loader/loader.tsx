import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <p>Ternhub loading...</p>

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

export default Loader;
