import { VStack } from '@chakra-ui/react';
import { Record } from '../../domain/record';
import { RecordArea } from '../molecules/RecordArea';

type Props = {
  records: Record[];
  onDelete: (id: string, index: number) => void;
  onUpdate: (id: string, title: string, time: number | null) => Promise<boolean>;
};

export const RecordsArea = (props: Props) => {
  const { records, onDelete, onUpdate } = props;
  return (
    <VStack>
      {records.map((record, index) => {
        return (
          <RecordArea key={index} id={record.id} title={record.title} time={record.time} index={index} onDelete={onDelete} onUpdate={onUpdate} />
        );
      })}
    </VStack>
  );
};
