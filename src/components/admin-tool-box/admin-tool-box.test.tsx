import { render, screen, fireEvent } from "@testing-library/react";
import { AdminToolBox } from "..";

describe("AdminToolBox", () => {
  const deleteButtonOnclick = jest.fn();

  beforeEach(() => {
    render(
      <AdminToolBox
        editButtonLabel=""
        editButtonUrl=""
        deleteButtonLabel=""
        deleteButtonOnclick={deleteButtonOnclick}
      />
    );
  });

  it("renders correctly", () => {
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("button calls once after clicking", () => {
    const buttonElement = screen.getByRole("button");

    fireEvent.click(buttonElement);

    expect(deleteButtonOnclick).toHaveBeenCalledTimes(1);
  });
});
