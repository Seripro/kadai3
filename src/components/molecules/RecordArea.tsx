import { HStack } from '@chakra-ui/react';
import { DeleteButton } from './DeleteButton';
import { TextCard } from './TextCard';
import { EditModal } from '../organisms/EditModal';

type Props = {
  id: string;
  title: string;
  time: number | null;
  index: number;
  onDelete: (id: string, index: number) => void;
  onUpdate: (id: string, title: string, time: number | null) => Promise<boolean>;
};

export const RecordArea = (props: Props) => {
  return (
    <div>
      <HStack>
        <TextCard>{props.title}</TextCard>
        <TextCard>{props.time}時間</TextCard>
        <DeleteButton id={props.id} index={props.index} onDelete={props.onDelete} />
        <EditModal id={props.id} title={props.title} time={props.time} onUpdate={props.onUpdate} />
      </HStack>
    </div>
  );
};
