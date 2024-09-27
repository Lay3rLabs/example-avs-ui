"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/Modal/Modal";

type FaucetModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  requestTokens: () => Promise<void>;
};

export function FaucetModal({
  open,
  setOpen,
  requestTokens,
}: FaucetModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFaucetRequest = async () => {
    setIsLoading(true);
    try {
      await requestTokens();
      setIsSuccess(true);
    } catch (error) {
      console.error("Error calling faucet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <ModalHeader>
        <h2 className="text-xl font-semibold text-text-primary">
          Insufficient Balance
        </h2>
      </ModalHeader>
      <ModalBody>
        <p className="text-text-secondary">
          You currently have 0 tokens in your account. Please use the public
          faucet on the Lay3r Testnet to get tokens and start using the
          application.
        </p>
        {!isLoading && !isSuccess && (
          <button
            className="w-full justify-center h-auto mb-3"
            onClick={handleFaucetRequest}
          >
            Request Tokens
          </button>
        )}
        {isLoading && (
          <motion.div
            className="flex justify-center items-center h-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              className="animate-spin h-8 w-8 text-text-brand"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </motion.div>
        )}
        {isSuccess && (
          <motion.div
            className="flex flex-col items-center h-24"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <svg
              className="text-text-interactive-valid w-16 h-16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.28 16.72a.75.75 0 001.06 0l7-7a.75.75 0 00-1.06-1.06l-6.47 6.47-2.47-2.47a.75.75 0 00-1.06 1.06l3 3z"
              />
            </svg>
            <p className="text-text-interactive-valid mt-2">
              Tokens received successfully!
            </p>
          </motion.div>
        )}
      </ModalBody>
      <ModalFooter>
        {isSuccess && (
          <button className="w-full" onClick={() => setOpen(false)}>
            Close
          </button>
        )}
      </ModalFooter>
    </Modal>
  );
}
