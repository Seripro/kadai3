/* eslint-disable @typescript-eslint/no-explicit-any */

import { CreateToasterReturn, Toast, ToastDescriptionProps } from "@chakra-ui/react";
import { FC, ReactElement } from "react";

interface CustomToastDescriptionProps extends ToastDescriptionProps {
  children?: (toast: any) => ReactElement;
  toaster: ReturnType<typeof CreateToasterReturn>;
}

export const ToastDescriptionWithType =
  Toast.Description as FC<CustomToastDescriptionProps>
