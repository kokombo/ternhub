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

    render(
      <FaqCard props={faq} onClickFaqEditButton={onClickFaqEditButtonHandler} />
    );
  });

  const onClickFaqEditButtonHandler = jest.fn();
  const showAndHideAnswerHandler = jest.fn();

  const faqCard = screen.getByTestId("faq-card");

  it("onclick handler is called to show and hide answer", () => {
    fireEvent.click(faqCard);

    expect(showAndHideAnswerHandler).toHaveBeenCalledTimes(1);
  });

  it("renders edit faq icon when showEditIcon is true i.e. pathname = '/admin/faqs' ", () => {
    mockUsePathname.mockImplementation(() => "/admin/faqs");

    const editFaqButton = screen.getByTestId("edit-faq-button");

    expect(editFaqButton).toBeInTheDocument();
  });

  it("does not render edit faq icon when showEditIcon is false", () => {
    mockUsePathname.mockImplementation(() => "/some/other/path");

    const editFaqButton = screen.getByTestId("edit-faq-button");

    expect(editFaqButton).toBeNull();
  });
});
