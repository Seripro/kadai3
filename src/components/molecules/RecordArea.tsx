import { DeleteButton } from './DeleteButton';

type Props = {
  id: string;
  title: string;
  time: number | null;
  index: number;
  onDelete: (id: string, index: number) => void;
};

export const RecordArea = (props: Props) => {
  return (
    <div key={props.id} style={{ display: 'flex' }}>
      <p>
        {props.title} {props.time}時間
      </p>
      <DeleteButton id={props.id} index={props.index} onDelete={props.onDelete} />
    </div>
  );
};
