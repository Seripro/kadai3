type Props = {
  timeList: (number | null)[];
};

export const SumTime = (props: Props) => {
  return (
    <p>
      合計時間：
      {props.timeList
        .filter((val): val is number => val !== null) // ここで number[] に絞り込む
        .reduce((acc, cur) => acc + cur, 0)}
      /1000(h)
    </p>
  );
};
