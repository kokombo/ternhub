import type { Config } from "jest";
import nextJest from "next/jest.js";

TextDecoder = require("util").TextDecoder;
TextEncoder = require("util").TextEncoder;

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

export default createJestConfig(config);
