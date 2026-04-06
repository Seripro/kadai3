import { StudyRecord } from '../../types/recordType';
import { RecordArea } from '../molecules/RecordArea';

type Props = {
  records: StudyRecord[];
  onDelete: (id: string, index: number) => void;
};

export const RecordsArea = (props: Props) => {
  const { records, onDelete } = props;
  return (
    <>
      {records.map((record, index) => {
        return <RecordArea id={record.id} title={record.title} time={record.time} index={index} onDelete={onDelete} />;
      })}
    </>
  );
};
