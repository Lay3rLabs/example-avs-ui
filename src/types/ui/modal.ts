import { ReactNode } from "react";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export type ModalHeaderProps = {
  children: ReactNode;
};

export type ModalBodyProps = {
  children: ReactNode;
};

export type ModalFooterProps = {
  children: ReactNode;
};
