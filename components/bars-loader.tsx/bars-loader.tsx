import { Bars } from "react-loader-spinner";

const BarsLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Bars
        visible={true}
        height="100"
        width="100"
        color="#5627FF"
        ariaLabel="tail-spin-loading"
      />
    </div>
  );
};

export default BarsLoader;
