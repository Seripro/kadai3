import { Button, CloseButton, Dialog, HStack, VStack, Portal } from '@chakra-ui/react';
import type React from 'react';
import type { FC } from 'react';
import { useState } from 'react';
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
  id: string;
  title: string;
  time: number | null;
  onUpdate: (id: string, title: string, time: number | null) => Promise<boolean>;
};

export const EditModal = (props: Props) => {
  const { id, title, time, onUpdate } = props;
  const [editTitle, setEditTitle] = useState(title);
  const [editTime, setEditTime] = useState<number | ''>(time ?? '');
  const [open, setOpen] = useState(false);

  const resetEditState = () => {
    setEditTitle(title);
    setEditTime(time ?? '');
  };

  const onClickCancel = () => {
    resetEditState();
  };

  const onClickUpdate = async () => {
    const updated = await onUpdate(id, editTitle, editTime === '' ? null : Number(editTime));
    if (updated) {
      resetEditState();
      setOpen(false);
    }
  };

  return (
    <HStack>
      <Dialog.Root
        size="sm"
        open={open}
        onOpenChange={(e: { open: boolean }) => {
          setOpen(e.open);
        }}
      >
        <DialogTriggerWithType asChild>
          <Button
            colorPalette="blue"
            variant="surface"
            size="xs"
            onClick={() => {
              resetEditState();
              setOpen(true);
            }}
          >
            編集
          </Button>
        </DialogTriggerWithType>
        <Portal>
          <Dialog.Backdrop />
          <DialogPositionerWithType>
            <DialogContentWithType>
              <Dialog.Header>
                <DialogTitleWithType>学習記録を編集</DialogTitleWithType>
              </Dialog.Header>
              <Dialog.Body>
                <VStack>
                  <InputArea placeholder="英語" type={'title'} value={editTitle} setState={setEditTitle}>
                    学習内容
                  </InputArea>
                  <InputArea placeholder="3" type={'time'} value={editTime} setState={setEditTime}>
                    学習時間
                  </InputArea>
                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" colorPalette="red" onClick={onClickCancel}>
                    キャンセル
                  </Button>
                </Dialog.ActionTrigger>
                <Button variant="outline" colorPalette="green" onClick={onClickUpdate}>
                  更新
                </Button>
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
