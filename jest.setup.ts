import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "node:util";
// import { SessionProvider } from "next-auth/react";

// import { server } from "./mocks/server";

global.TextEncoder = TextEncoder;

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");

  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { role: "admin" },
  };

  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" };
    }),
  };
});

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
