import { render, screen, fireEvent } from "@testing-library/react";
import { FaqCard } from "..";

const mockUsePathname = jest.fn();
const mockShowAndHideAnswer = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

// jest.mock("..", () => ({
//   showAndHideAnswer() {
//     return mockShowAndHideAnswer();
//   },
// }));

describe("faq card", () => {
  const faq = {
    _id: "Faq id",
    question: "Faq question",
    answer: "Faq answer",
  };

  const onClickFaqEditButton = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    render(<FaqCard props={faq} onClickFaqEditButton={onClickFaqEditButton} />);
  });

  it("onclick handler is called to show and hide answer", () => {
    // const mockShowAndHideAnswer = jest.fn();

    const faqCard = screen.getByTestId("faq-card");

    fireEvent.click(faqCard);

    expect(mockShowAndHideAnswer).toHaveBeenCalledTimes(1);
  });

  it("renders edit faq icon when showEditIcon is true i.e. pathname = '/admin/faqs' ", () => {
    // mockUsePathname.mockImplementation(() => "/admin/faqs");

    const editFaqButton = screen.queryByTestId("edit-icon");

    mockUsePathname.mockReturnValue("/admin/faqs");

    expect(editFaqButton).toBeInTheDocument();
  });

  it("does not render edit faq icon when showEditIcon is false", () => {
    // mockUsePathname.mockImplementation(() => "/some/other/path");

    const editFaqButton = screen.queryByTestId("edit-icon");

    mockUsePathname.mockReturnValue("/some/other/path");

    expect(editFaqButton).toBeNull();
  });
});
