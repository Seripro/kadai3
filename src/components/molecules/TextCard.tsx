import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const TextCard = (props: Props) => {
  return (
    <Box bg="bg.emphasized" px="4" py="2" borderRadius="md" color="fg">
      {props.children}
    </Box>
  );
};
