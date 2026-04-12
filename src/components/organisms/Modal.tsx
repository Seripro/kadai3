import { Button, CloseButton, Dialog, HStack, Portal } from '@chakra-ui/react';
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
};

export const Modal = (props: Props) => {
  const { title, time, setError, createRecord, setTitle, setTime } = props;
  return (
    <HStack>
      <Dialog.Root size="sm">
        <DialogTriggerWithType asChild>
          <Button variant="outline" size="sm">
            Open
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
                <InputArea type={'title'} value={title} setState={setTitle}>
                  学習内容
                </InputArea>
                <InputArea type={'time'} value={time} setState={setTime}>
                  学習時間
                </InputArea>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" colorPalette="red">
                    キャンセル
                  </Button>
                </Dialog.ActionTrigger>
                <RegisterButton title={title} time={time} setError={setError} createRecord={createRecord} />
              </Dialog.Footer>
              <DialogCloseTriggerWithType asChild>
                <CloseButton size="sm" />
              </DialogCloseTriggerWithType>
            </DialogContentWithType>
          </DialogPositionerWithType>
        </Portal>
      </Dialog.Root>
    </HStack>
  );
};
