"use client";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/Modal/Modal";

type FaucetModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function FaucetModal({
  open,
  setOpen,
}: FaucetModalProps) {
  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <ModalHeader>
        <h2 className="text-xl font-semibold text-text-primary">
          Insufficient Balance
        </h2>
      </ModalHeader>
      <ModalBody>
        <p className="text-text-secondary">
          You currently have 0 tokens in your account. Please use the Telegram
          bot to get tokens from the faucet and start using the application.
        </p>

        <a
          href="https://t.me/LayerUp_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full justify-center h-auto mt-3 block"
        >
          Open Telegram Bot
        </a>
      </ModalBody>
      <ModalFooter>
        <button className="w-full" onClick={() => setOpen(false)}>
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
}
