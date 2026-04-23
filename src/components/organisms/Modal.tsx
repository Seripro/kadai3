import { Button, CloseButton, Dialog, HStack, VStack, Portal, Text } from '@chakra-ui/react';
import type React from 'react';
import type { FC } from 'react';
import { RegisterButton } from '../molecules/RegisterButton';
import { InputArea } from './InputArea';

interface CustomDialogTriggerProps extends Dialog.TriggerProps {
  children?: React.ReactNode;
  asChild?: boolean;
}

interface CustomDialogPositionerProps extends Dialog.PositionerProps {
  children?: React.ReactNode;
}

interface CustomDialogContentProps extends Dialog.ContentProps {
  children?: React.ReactNode;
}

interface CustomDialogTitleProps extends Dialog.TitleProps {
  children?: React.ReactNode;
}

interface CustomDialogCloseTriggerProps extends Dialog.CloseTriggerProps {
  children?: React.ReactNode;
  asChild?: boolean;
}

const DialogTriggerWithType = Dialog.Trigger as FC<CustomDialogTriggerProps>;
const DialogPositionerWithType = Dialog.Positioner as FC<CustomDialogPositionerProps>;
const DialogContentWithType = Dialog.Content as FC<CustomDialogContentProps>;
const DialogTitleWithType = Dialog.Title as FC<CustomDialogTitleProps>;
const DialogCloseTriggerWithType = Dialog.CloseTrigger as FC<CustomDialogCloseTriggerProps>;

type Props = {
  title: string;
  time: number | '';
  setError: React.Dispatch<React.SetStateAction<string>>;
  createRecord: (title: string, time: number) => Promise<void>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setTime: React.Dispatch<React.SetStateAction<number | ''>>;
  error: string;
};

export const Modal = (props: Props) => {
  const { title, time, setError, createRecord, setTitle, setTime, error } = props;
  const onClickCancel = () => {
    setTime('');
    setTitle('');
    setError('');
  };
  return (
    <HStack>
      <Dialog.Root size="sm">
        <DialogTriggerWithType asChild>
          <Button variant="outline" size="sm" colorPalette="green">
            記録を追加
          </Button>
        </DialogTriggerWithType>
        <Portal>
          <Dialog.Backdrop />
          <DialogPositionerWithType>
            <DialogContentWithType>
              <Dialog.Header>
                <DialogTitleWithType>学習記録を追加</DialogTitleWithType>
              </Dialog.Header>
              <Dialog.Body>
                <VStack>
                  <InputArea placeholder="英語" type={'title'} value={title} setState={setTitle}>
                    学習内容
                  </InputArea>
                  <InputArea placeholder="3" type={'time'} value={time} setState={setTime}>
                    学習時間
                  </InputArea>
                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <Text style={{ color: 'red' }}>{error}</Text>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" colorPalette="red" onClick={onClickCancel}>
                    キャンセル
                  </Button>
                </Dialog.ActionTrigger>
                <RegisterButton title={title} time={time} error={error} setError={setError} createRecord={createRecord} />
              </Dialog.Footer>
              <DialogCloseTriggerWithType asChild>
                <CloseButton size="sm" onClick={onClickCancel} />
              </DialogCloseTriggerWithType>
            </DialogContentWithType>
          </DialogPositionerWithType>
        </Portal>
      </Dialog.Root>
    </HStack>
  );
};
