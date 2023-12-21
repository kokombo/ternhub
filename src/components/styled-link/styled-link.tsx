import Link from "next/link";

type Props = {
  url: string;
  label: string;
  arialabel: string;
  prefetch?: boolean;
  extraClasses?: string;
};

const StyledLink = (props: Props) => {
  return (
    <Link
      href={props.url}
      aria-label={props.arialabel}
      className={`signup_button ${props.extraClasses}`}
      prefetch={props.prefetch}
    >
      {props.label}
    </Link>
  );
};

export default StyledLink;
