import { Bars } from "react-loader-spinner";

const BarsLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Bars
        visible={true}
        height="50"
        width="50"
        color="#5627FF"
        ariaLabel="tail-spin-loading"
      />
    </div>
  );
};

export default BarsLoader;
