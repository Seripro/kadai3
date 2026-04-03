import { useEffect, useState } from "react";
import { deleteRecord, getAllRecords, insertRecord } from "../utils/supabaseFunctions";
import { StudyRecord } from "../types/recordType";

export const useStudyRecords = () =>{
  const [title, setTitle] = useState("");
  const [time, setTime] = useState<number|"">(0);
  const [records, setRecords] = useState<StudyRecord[]>([]);
  const [error, setError] = useState("");
  const [timeList, setTimeList] = useState<(number|null)[]>([0]);
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
          setTitle("");
          setTime(0);
            setError("");
        } catch (e) {
          console.log(e);
          setError("登録に失敗しました");
        }
      };


    const deleteRecordById = async (id: string, index:number) => {
      try {
        await deleteRecord(id);
        const newRecords = [...records];
        newRecords.splice(index, 1);
        setRecords(newRecords);
        const newTimeList = [...timeList];
        newTimeList.splice(index, 1);
        setTimeList(newTimeList);
      } catch {
        setError("削除に失敗しました");
      }
    };

    return {
        title, setTitle, time, setTime, error, setError, loading, records, timeList, createRecord, deleteRecordById
    }
}
