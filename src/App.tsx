import { Spinner, Center } from '@chakra-ui/react';
import './App.css';
import { SumTime } from './components/molecules/SumTime';
import { Modal } from './components/organisms/Modal';
import { RecordsArea } from './components/organisms/RecordsArea';
import { useStudyRecords } from './hooks/useStudyRecords';

export function App() {
  const { title, setTitle, time, setTime, error, setError, loading, records, timeList, createRecord, deleteRecordById } = useStudyRecords();

  return (
    <>
      {loading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <>
          <h1 data-testid="title">学習記録一覧</h1>
          <Modal title={title} time={time} setError={setError} createRecord={createRecord} setTitle={setTitle} setTime={setTime} error={error} />
          <RecordsArea records={records} onDelete={deleteRecordById} />
          <SumTime timeList={timeList} />
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
