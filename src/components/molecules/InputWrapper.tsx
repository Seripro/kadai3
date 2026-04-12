import React from 'react';
import { Input } from '@chakra-ui/react';

type TitleProps = {
  placeholder: string;
  type: 'title';
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

type TimeProps = {
  placeholder: string;
  type: 'time';
  value: number | '';
  setState: React.Dispatch<React.SetStateAction<number | ''>>;
};

export type InputProps = TitleProps | TimeProps;

export const InputWrapper = (props: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (props.type === 'time') {
      // 数値用のロジック
      const parsed = parseInt(inputValue);
      if (!isNaN(parsed)) {
        props.setState(parsed);
      } else if (inputValue === '') {
        props.setState('');
      }
    } else {
      // 文字列用のロジック
      props.setState(inputValue);
    }
  };

  return (
    <Input
      placeholder={props.placeholder}
      variant="subtle"
      value={props.value}
      onChange={handleChange}
      type={props.type === 'time' ? 'number' : 'text'}
    />
  );
};
