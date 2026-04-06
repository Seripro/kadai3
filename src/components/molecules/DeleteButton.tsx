type Props = {
  id: string;
  index: number;
  onDelete: (id: string, index: number) => void;
};

export const DeleteButton = (props: Props) => {
  const onClickDelete = (id: string, index: number) => {
    props.onDelete(id, index);
  };
  return <button onClick={() => onClickDelete(props.id, props.index)}>削除</button>;
};
