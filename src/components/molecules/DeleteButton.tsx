import { Button } from '@chakra-ui/react';

type Props = {
  id: string;
  index: number;
  onDelete: (id: string, index: number) => void;
};

export const DeleteButton = (props: Props) => {
  const onClickDelete = (id: string, index: number) => {
    props.onDelete(id, index);
  };
  return (
    <Button onClick={() => onClickDelete(props.id, props.index)} colorPalette="red" variant="surface" size="xs">
      削除
    </Button>
  );
};
