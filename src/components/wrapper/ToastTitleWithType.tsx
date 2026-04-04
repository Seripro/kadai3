/* eslint-disable @typescript-eslint/no-explicit-any */

import { CreateToasterReturn, Toast, ToastTitleProps } from "@chakra-ui/react";
import { FC, ReactElement } from "react";

interface CustomToastTitleProps extends ToastTitleProps {
  children?: (toast: any) => ReactElement;
  toaster: ReturnType<typeof CreateToasterReturn>;
}

export const ToastTitleWithType =
  Toast.Title as FC<CustomToastTitleProps>
