import { ColorRing } from "react-loader-spinner";

const ColorRingLoader = () => {
  return (
    <div>
      <ColorRing
        visible={true}
        height="100"
        width="100"
        colors={["#5627FF", "#CE0A0A", "#00632D", "#141024", "#2F00D7"]}
        ariaLabel="tail-spin-loading"
      />
    </div>
  );
};

export default ColorRingLoader;
