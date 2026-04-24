import { useEffect, useState } from 'react';
import { deleteRecord, getAllRecords, insertRecord, updateRecord } from '../utils/supabaseFunctions';
import { Record } from '../domain/record';

export const useStudyRecords = () => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState<number | ''>(0);
  const [records, setRecords] = useState<Record[]>([]);
  const [error, setError] = useState('');
  const [timeList, setTimeList] = useState<(number | null)[]>([0]);
  const [loading, setLoading] = useState(false);

  const getRecords = async () => {
    setLoading(true);
    try {
      const res = await getAllRecords();
      if (res.error) {
        console.log(res.error);
        return;
      }
      setRecords(res.data);
      setTimeList(res.data.map((record) => record.time));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  const createRecord = async (title: string, time: number) => {
    try {
      await insertRecord({ title: title, time: time });
      await getRecords();
      setTitle('');
      setTime(0);
      setError('');
    } catch (e) {
      console.log(e);
      setError('登録に失敗しました');
    }
  };

  const deleteRecordById = async (id: string, index: number) => {
    try {
      await deleteRecord(id);
      const newRecords = [...records];
      newRecords.splice(index, 1);
      setRecords(newRecords);
      const newTimeList = [...timeList];
      newTimeList.splice(index, 1);
      setTimeList(newTimeList);
    } catch {
      setError('削除に失敗しました');
    }
  };

  const updateRecordById = async (id: string, title: string, time: number | null) => {
    try {
      await updateRecord({ id: id, title: title, time: time });
      const newRecords = records.map((record) => {
        if (record.id !== id) {
          return record;
        }
        return {
          ...record,
          title: title,
          time: time,
        };
      });
      setRecords(newRecords);
      setTimeList(newRecords.map((record) => record.time));
      setError('');
      return true;
    } catch {
      setError('更新に失敗しました');
      return false;
    }
  };

  return {
    title,
    setTitle,
    time,
    setTime,
    error,
    setError,
    loading,
    records,
    timeList,
    createRecord,
    deleteRecordById,
    updateRecordById,
  };
};
