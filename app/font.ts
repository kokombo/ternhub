import localFont from "next/font/local";

const Grotesk = localFont({
  src: [
    {
      path: "../public/assets/font/FoundersGrotesk-Regular.otf",
      style: "normal",
    },
  ],
});

const Sans = localFont({
  src: [
    {
      path: "../public/assets/font/SourceSansPro-Regular.ttf",
      style: "normal",
    },
  ],
});

export { Grotesk, Sans };
