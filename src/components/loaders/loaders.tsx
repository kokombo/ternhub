import {
  Bars,
  ColorRing,
  RotatingLines,
  RotatingSquare,
  TailSpin,
  ThreeDots,
} from "react-loader-spinner";
import { Logo } from "..";

export const ThreeDotLoader = () => {
  return (
    <div className="h-screen flex flex-col items-center pt-[200px] gap-2 bg-[#000000]">
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

export const RotatingLinesLoader = () => {
  return (
    <div className="h-screen flex items-start justify-center mt-10">
      <RotatingLines
        visible={true}
        width="50"
        strokeColor="#5627FF"
        ariaLabel="tail-spin-loading"
      />
    </div>
  );
};

export const RotatingSquareLoader = () => {
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

export const SubmitFormLoader = () => {
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

export const TailSpinLoader = () => {
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

export const OverlayLoader = () => {
  return (
    <div className="fixed top-0 left-0 opacity-90 bg-teal-50 flex items-center justify-center">
      OverlayLoaderr
    </div>
  );
};

export const ColorRingLoader = () => {
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

export const BarsLoader = () => {
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
