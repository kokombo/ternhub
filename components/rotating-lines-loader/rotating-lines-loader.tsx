import { RotatingLines } from "react-loader-spinner";

const RotatingLinesLoader = () => {
  return (
    <div className="z-1">
      <RotatingLines
        visible={true}
        width="100"
        strokeColor="#5627FF"
        ariaLabel="tail-spin-loading"
      />
    </div>
  );
};

export default RotatingLinesLoader;
