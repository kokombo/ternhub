import { StyledLink } from "..";

type Props = {
  editButtonLabel: string;
  editButtonUrl: string;
  deleteButtonLabel: string;
  deleteButtonOnclick: () => void;
};

const AdminToolBox = (props: Props) => {
  return (
    <div className="flex gap-12 items-center justify-center">
      <StyledLink
        url={props.editButtonUrl}
        label={props.editButtonLabel}
        arialabel={props.editButtonLabel}
        prefetch={false}
        extraClasses="blue_button"
      />

      <button onClick={props.deleteButtonOnclick} className="blue_button">
        {props.deleteButtonLabel}
      </button>
    </div>
  );
};

export default AdminToolBox;
