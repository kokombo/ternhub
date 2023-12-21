import Link from "next/link";

type Props = {
  linkLabel: string;
  linkUrl: string;
};

const NotFoundComponent = (props: Props) => {
  return (
    <section className="flex flex-col items-center justify-center text-center gap-5 min-h-screen px-5 ">
      <h1 className="lg:text-[280px] lg:leading-[200px] text-[140px] leading-[100px] text-purple">
        404
      </h1>

      <h2 className="text-2xl lg:text-4xl tracking-[0.5] font-[400] font-sans text-textblack">
        Oops, Page Not Found!
      </h2>

      <p className="text-base lg:text-[20px] tracking-[0.5] font-[400] ">
        Sorry the page you are looking for does not exist or could not be found.
        Please return to the homepage.
      </p>

      <Link
        href={props.linkUrl}
        aria-label="Page not found,return to the homepage"
        className="px-6 py-[8px] lg:px-8 lg:py-3 text-sm lg:text-base font-semibold bg-purple hover:bg-blue text-white rounded-[10px]"
      >
        {props.linkLabel}
      </Link>
    </section>
  );
};

export default NotFoundComponent;
