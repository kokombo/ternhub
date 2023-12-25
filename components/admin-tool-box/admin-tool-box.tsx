import { StyledLink } from "..";

type Props = {
  editButtonLabel: string;
  editButtonUrl: string;
  deleteButtonLabel: string;
  deleteButtonOnclick: () => void;
};

const AdminToolBox = (props: Props) => {
  return (
    <div className="flex gap-6 items-center justify-center">
      <StyledLink
        url={props.editButtonUrl}
        label={props.editButtonLabel}
        arialabel={props.editButtonLabel}
        prefetch={false}
      />

      <button onClick={props.deleteButtonOnclick}>
        {props.deleteButtonLabel}
      </button>
    </div>
  );
};

export default AdminToolBox;
