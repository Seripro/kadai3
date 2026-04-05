import "./App.css";
import { Input } from "./components/molecules/Input";
import {Demo} from "./components/ui/Demo"
import { useStudyRecords } from "./hooks/useStudyRecords";



export function App() {
const {title, setTitle, time, setTime, error, setError, loading, records, timeList, createRecord, deleteRecordById} = useStudyRecords()
  const handleClick = () => {
    if (title === "" || time === 0 || time === "") {
      setError("入力されていない項目があります");
    } else {
      createRecord(title, time);
    }
  };

  const onClickDelete = ( id: string, index: number) => {
    deleteRecordById(id, index);
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
            <Input type={"title"} value={title} setState={setTitle}/>
          </div>
          <div style={{ display: "flex" }}>
            <p>学習時間</p>
            <Input type={"time"} value={time} setState={setTime}/>
          </div>
          <p>入力されている学習内容：{title}</p>
          <p>入力されている時間：{time}時間</p>
          {records.map((record, index) => {
            return (
              <div key={record.id} style={{ display: "flex" }}>
                <p>
                  {record.title} {record.time}時間
                </p>
                <button onClick={() => onClickDelete(record.id, index)}>
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
