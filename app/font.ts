import localFont from "next/font/local";

const GroteskNormal = localFont({
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

const GroteskBold = localFont({
  src: [
    {
      path: "../public/assets/font/FoundersGrotesk-Bold.otf",
      style: "bold",
    },
  ],
});

export { GroteskNormal, Sans, GroteskBold };
