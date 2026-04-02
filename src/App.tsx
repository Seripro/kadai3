import "./App.css";
import { useState, useEffect } from "react";
import {
  deleteRecord,
  getAllRecords,
  insertRecord,
} from "./utils/supabaseFunctions";
import { StudyRecord } from "./types/recordType";
import {Demo} from "./components/ui/Demo"

export function App() {
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

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value)) {
      setTime(value);
    }else if(e.target.value === ""){
      setTime("")
    }
  };
  const handleClick = () => {
    if (title === "" || time === 0 || time === "") {
      setError("入力されていない項目があります");
    } else {
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
      createRecord(title, time);
    }
  };

  const onClickDelete = (index: number, id: string) => {
    const deleteRecordById = async () => {
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
    deleteRecordById();
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 data-testid="title">学習記録一覧</h1>
          <div style={{ display: "flex" }}>
            <p>学習内容</p>
            <input value={title} onChange={handleTitle} />
          </div>
          <div style={{ display: "flex" }}>
            <p>学習時間</p>
            <input value={time} onChange={handleTime} />
          </div>
          <p>入力されている学習内容：{title}</p>
          <p>入力されている時間：{time}時間</p>
          {records.map((record, index) => {
            return (
              <div key={record.id} style={{ display: "flex" }}>
                <p>
                  {record.title} {record.time}時間
                </p>
                <button onClick={() => onClickDelete(index, record.id)}>
                  削除
                </button>
              </div>
            );
          })}
          <button onClick={handleClick}>登録</button>
          <p>
            合計時間：
            {timeList
              .filter((val): val is number => val !== null) // ここで number[] に絞り込む
              .reduce((acc, cur) => acc + cur, 0)}
            /1000(h)
          </p>
          <p>{error}</p>
          <Demo/>
        </>
      )}
    </>
  );
}

// import React from "react";
// function App() {
//   return (
//     <>
//       <h1 data-testid="title">Hello Jest</h1>
//     </>
//   );
// }

// export default App;
