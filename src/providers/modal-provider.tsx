import { Dialog } from "@radix-ui/react-dialog";
import React from "react";

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  return <Dialog>{children}</Dialog>;
};

export default ModalProvider;
