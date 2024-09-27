import Link from "next/link";

type Props = {
  url: string;
  label: string;
  arialabel: string;
  prefetch?: boolean;
  className?: string;
  onClick?: () => void;
};

const StyledLink = (props: Props) => {
  return (
    <Link
      href={props.url}
      aria-label={props.arialabel}
      className={className}
      prefetch={props.prefetch}
      onClick={props.onClick}
    >
      {props.label}
    </Link>
  );
};

export default StyledLink;
