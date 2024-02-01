import ReactGA from "react-ga";

const TRACKING_ID = "G-93C2BN5147";

export const initializeGA = () => {
  ReactGA.initialize(TRACKING_ID);
};

export const logPageView = () => {
  if (typeof window !== "undefined") {
    ReactGA.set({ page: window.location.pathname });

    ReactGA.pageview(window.location.pathname);
  }
};
