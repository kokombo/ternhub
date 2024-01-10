import { render, screen, fireEvent } from "@testing-library/react";
import { BlogCard } from "..";
import { useRouter } from "next/navigation";
import mockRouter from "next-router-mock";

jest.mock("next/navigation", () => require("next-router-mock"));

jest.mock("@/utilities/data-fetching/getBlogBySlug", () => ({
  getBlogBySlug: jest.fn(() => ({ isLoading: true })),
}));

describe("blog card component", () => {
  const blog = {
    title: "blog title",
    image: "https://blogimage.jpeg",
    category: "blog category",
    author: {
      name: "blog author name",
    },
    createdAt: new Date(),
    metaDescription: "blog meta description",
    slug: "blog-title",
    _id: "blog id",
    numberOfViews: 10,
    content: "Blog content",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    render(<BlogCard props={blog} rootUrl="/blog" />);
  });

  test("renders blog card with correct content", () => {
    expect(screen.getByText(new RegExp(blog.title))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(blog.category))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(blog.metaDescription))
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(blog.author.name))).toBeInTheDocument();
  });

  test("navigates to blog details page on button click", () => {
    const pushHandler = jest.fn();

    const readMoreButton = screen.getByText("Read more");

    fireEvent.click(readMoreButton);
  });
});
