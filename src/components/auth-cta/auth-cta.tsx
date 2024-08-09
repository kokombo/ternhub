import Link from "next/link";

type Props = {
  url: string;
  label: string;
  cta: string;
};

const AuthCTA = (props: Props) => {
  return (
    <p className="text-[14px] tracking-[1%] font-[400] lg:text-base">
      {props.label}{" "}
      <span>
        <Link href={props.url} className="text-purple">
          {props.cta}
        </Link>
      </span>
    </p>
  );
};

export default AuthCTA;
