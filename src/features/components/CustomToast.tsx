import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from "@gluestack-ui/themed";
import { FC } from "react";

type Props = {
  toastId: string;
  title: string;
  message: string;
  action: "success" | "error";
};

export const CustomToast: FC<Props> = ({ toastId, title, message, action }) => {
  return (
    <Toast nativeID={toastId} action={action} variant="solid">
      <VStack space="xs">
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{message}</ToastDescription>
      </VStack>
    </Toast>
  );
};
