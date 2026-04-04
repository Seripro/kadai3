/* eslint-disable @typescript-eslint/no-explicit-any */

import { CreateToasterReturn, Toaster, ToasterProps } from "@chakra-ui/react";
import { FC, ReactElement } from "react";

interface CustomToasterProps extends ToasterProps {
  children?: (toast: any) => ReactElement;
  toaster: ReturnType<typeof CreateToasterReturn>; // createToaster の戻り値の型
}

export const ToasterWithType =
  Toaster as FC<CustomToasterProps>;





