import Link from "next/link";

type Props = {
  url: string;
  label: string;
  arialabel: string;
};

const StyledLink = (props: Props) => {
  return (
    <Link
      href={props.url}
      aria-label={props.arialabel}
      className="signup_button"
    >
      {props.label}
    </Link>
  );
};

export default StyledLink;
