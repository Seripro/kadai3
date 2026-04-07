import './App.css';
import { InputContent } from './components/molecules/InputContent';
import { RegisterButton } from './components/molecules/RegisterButton';
import { InputArea } from './components/organisms/InputArea';
import { RecordsArea } from './components/organisms/RecordsArea';
import { Demo } from './components/ui/Demo';
import { useStudyRecords } from './hooks/useStudyRecords';

export function App() {
  const { title, setTitle, time, setTime, error, setError, loading, records, timeList, createRecord, deleteRecordById } = useStudyRecords();

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 data-testid="title">学習記録一覧</h1>
          <InputArea type={'title'} value={title} setState={setTitle}>
            学習内容
          </InputArea>
          <InputArea type={'time'} value={time} setState={setTime}>
            学習時間
          </InputArea>
          <InputContent title={title} time={time} />
          <RecordsArea records={records} onDelete={deleteRecordById} />
          <RegisterButton title={title} time={time} setError={setError} createRecord={createRecord} />
          <p>
            合計時間：
            {timeList
              .filter((val): val is number => val !== null) // ここで number[] に絞り込む
              .reduce((acc, cur) => acc + cur, 0)}
            /1000(h)
          </p>
          <p>{error}</p>
          <Demo />
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
