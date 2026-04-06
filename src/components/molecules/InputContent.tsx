type Props = {
  title: string;
  time: number | '';
};

export const InputContent = (props: Props) => {
  return (
    <>
      <p>入力されている学習内容：{props.title}</p>
      <p>入力されている時間：{props.time}時間</p>
    </>
  );
};
