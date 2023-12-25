const tags = [
  { tag: "product designer" },
  { tag: "frontend developer" },
  { tag: "backend developer" },
  { tag: "project manager" },
  { tag: "product manager" },
  { tag: "UI/UX designer" },
  { tag: "software engineer" },
  { tag: "data analyst" },
  { tag: "cybersecurity" },
];

const Tags = () => {
  return (
    <div className="md:flex flex-wrap items-center justify-center max-w-[878px] 2xl:px-[110px] gap-x-10 gap-y-9 hidden">
      {tags.map((item, index) => {
        return (
          <span
            key={index}
            className="text-greyblack px-[10px] py-[6px] border-[0.8px] border-grey capitalize lg:text-base text-sm tracking-[1%]"
          >
            {item.tag}
          </span>
        );
      })}
    </div>
  );
};

export default Tags;
