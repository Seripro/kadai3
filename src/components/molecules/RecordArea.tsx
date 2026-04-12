import { HStack } from '@chakra-ui/react';
import { DeleteButton } from './DeleteButton';
import { TextCard } from './TextCard';

type Props = {
  id: string;
  title: string;
  time: number | null;
  index: number;
  onDelete: (id: string, index: number) => void;
};

export const RecordArea = (props: Props) => {
  return (
    <div>
      <HStack>
        <TextCard>{props.title}</TextCard>
        <TextCard>{props.time}時間</TextCard>
        <DeleteButton id={props.id} index={props.index} onDelete={props.onDelete} />
      </HStack>
    </div>
  );
};
