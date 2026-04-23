import { Button } from '@chakra-ui/react';

type Props = {
  title: string;
  time: number | '';
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  createRecord: (title: string, time: number) => Promise<void>;
};

export const RegisterButton = (props: Props) => {
  const errors = ['学習内容を入力してください', '正しい学習時間を入力してください'];
  const titleCondition = props.title === '';
  const timeCondition = props.time === 0 || props.time === '' || props.time <= 0;
  const handleClick = () => {
    props.setError('');
    if (titleCondition) {
      props.setError(errors[0]);
    }
    if (timeCondition) {
      props.setError(errors[1]);
    }
    if (titleCondition && timeCondition) {
      props.setError(`${errors[0]}\n${errors[1]}`);
    }
    if (!(titleCondition || timeCondition) && typeof props.time === 'number') {
      props.createRecord(props.title, props.time);
    }
  };
  return (
    <Button variant="outline" colorPalette="green" onClick={handleClick}>
      登録
    </Button>
  );
};
