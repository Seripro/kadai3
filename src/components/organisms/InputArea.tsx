import { HStack } from '@chakra-ui/react';
import { InputWrapper, InputProps } from '../molecules/InputWrapper';
import { TextCard } from '../molecules/TextCard';

type Props = { children?: string } & InputProps;

export const InputArea = (props: Props) => {
  return (
    <HStack>
      <TextCard>{props.children}</TextCard>
      <InputWrapper {...props} />
    </HStack>
  );
};
