import { render } from "@testing-library/react";
import { AdminToolBox } from "..";

describe("AdminToolBox", () => {
  it("renders an admintoolbox", () => {
    render(
      <AdminToolBox
        editButtonLabel=""
        editButtonUrl=""
        deleteButtonLabel=""
        deleteButtonOnclick={() => {}}
      />
    );
  });
});
