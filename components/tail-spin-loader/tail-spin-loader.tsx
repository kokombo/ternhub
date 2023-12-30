import { TailSpin } from "react-loader-spinner";

const TailSpinLoader = () => {
  return (
    <div className="z-1">
      <TailSpin
        visible={true}
        height="100"
        width="100"
        color="#5627FF"
        ariaLabel="tail-spin-loading"
        radius="1"
      />
    </div>
  );
};

export default TailSpinLoader;
