"use client";

import {
  Portal,
  Spinner,
  Stack,
  Toast,
} from "@chakra-ui/react";
import { toaster } from "../../utils/toaster";
import { ToasterWithType } from "../wrapper/ToasterWithType";
import { ToastTitleWithType } from "../wrapper/ToastTitleWithType";
import { ToastDescriptionWithType } from "../wrapper/ToastDescriptionWithType";
import { ToastActionTriggerWithType } from "../wrapper/ToastActionTriggerWithType";

export const Toaster = () => {
  return (
    <Portal>
      <ToasterWithType toaster={toaster}>
        {(toast) => (
          <Toast.Root width={{ md: "sm" }} insetInline={{ mdDown: "4" }}>
            {toast.type === "loading" ? (
              <Spinner size="sm" color="blue.solid" />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <ToastTitleWithType toaster={toaster}>{toast.title}</ToastTitleWithType>}
              {toast.description && (
                <ToastDescriptionWithType toaster={toaster}>{toast.description}</ToastDescriptionWithType>
              )}
            </Stack>
            {toast.action && (
              <ToastActionTriggerWithType toaster={toaster}>{toast.action.label}</ToastActionTriggerWithType>
            )}
            {toast.meta?.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ToasterWithType>
    </Portal>
  );
};

