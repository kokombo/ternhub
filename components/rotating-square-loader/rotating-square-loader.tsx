import { RotatingSquare } from "react-loader-spinner";

const RotatingSquareLoader = () => {
  return (
    <div>
      <RotatingSquare
        visible={true}
        height="100"
        width="100"
        color="#5627FF"
        ariaLabel="tail-spin-loading"
      />
    </div>
  );
};

export default RotatingSquareLoader;
