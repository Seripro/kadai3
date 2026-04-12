import { Button } from '@chakra-ui/react';

type Props = {
  title: string;
  time: number | '';
  setError: React.Dispatch<React.SetStateAction<string>>;
  createRecord: (title: string, time: number) => Promise<void>;
};

export const RegisterButton = (props: Props) => {
  const handleClick = () => {
    if (props.title === '' || props.time === 0 || props.time === '') {
      props.setError('入力されていない項目があります');
    } else {
      props.createRecord(props.title, props.time);
    }
  };
  return (
    <Button variant="outline" colorPalette="green" onClick={handleClick}>
      登録
    </Button>
  );
};
