import { render, screen, fireEvent } from "@testing-library/react";
import { FaqCard } from "..";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

describe("faq card", () => {
  const faq = {
    _id: "Faq id",
    question: "Faq question",
    answer: "Faq answer",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    render(<FaqCard props={faq} onClickFaqEditButton={onClickFaqEditButton} />);
  });

  const onClickFaqEditButton = jest.fn();
  const showAndHideAnswer = jest.fn();

  it("onclick handler is called to show and hide answer", () => {
    const faqCard = screen.getByTestId("faq-card");

    fireEvent.click(faqCard);

    expect(showAndHideAnswer).toHaveBeenCalledTimes(1);
  });

  it("renders edit faq icon when showEditIcon is true i.e. pathname = '/admin/faqs' ", () => {
    // mockUsePathname.mockImplementation(() => "/admin/faqs");
    mockUsePathname.mockReturnValue("/admin/faqs");

    const editFaqButton = screen.getByTestId("edit-faq-button");

    expect(editFaqButton).toBeInTheDocument();
  });

  it("does not render edit faq icon when showEditIcon is false", () => {
    // mockUsePathname.mockImplementation(() => "/some/other/path");
    mockUsePathname.mockReturnValue("/some/other/path");

    const editFaqButton = screen.queryByTestId("edit-faq-button");

    expect(editFaqButton).toBeNull();
  });
});
