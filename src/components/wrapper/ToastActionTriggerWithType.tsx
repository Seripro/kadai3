/* eslint-disable @typescript-eslint/no-explicit-any */

import { CreateToasterReturn, Toast, ToastActionTriggerProps } from "@chakra-ui/react";
import { FC, ReactElement } from "react";

interface CustomToastActionTriggerProps extends ToastActionTriggerProps {
  children?: (toast: any) => ReactElement;
  toaster: ReturnType<typeof CreateToasterReturn>;
}

export const ToastActionTriggerWithType =
  Toast.ActionTrigger as FC<CustomToastActionTriggerProps>
