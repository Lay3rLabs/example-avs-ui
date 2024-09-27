"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/Modal/Modal";
import { WalletTypes } from "@/types";
import Image from "next/image";

// Define the wallet details with the WalletType keys
const walletDetails: Record<WalletTypes, { icon: string; name: string }> = {
  Keplr: {
    icon: "https://raw.githubusercontent.com/WHELP-project/whelp-frontend/main/packages/ui/public/images/walletIcons/keplr.png",
    name: "Keplr",
  },
  Leap: {
    icon: "https://raw.githubusercontent.com/WHELP-project/whelp-frontend/refs/heads/main/packages/ui/public/images/walletIcons/leap.png",
    name: "Leap",
  },
};

/**
 * WalletModal component for managing wallet connections.
 *
 * @component
 * @param {Object} props - Properties to configure the WalletModal component.
 * @param {boolean} props.open - Whether the modal is open or not.
 * @param {Function} props.setOpen - Function to set the modal open state.
 * @param {Function} props.onWalletClick - Callback function when a wallet is clicked.
 * @returns {React.ReactElement} The rendered WalletModal component.
 */
export function WalletModal({
  open,
  setOpen,
  onWalletClick,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onWalletClick: (wallet: WalletTypes) => Promise<void>;
}) {
  const [loadingWallet, setLoadingWallet] = useState<WalletTypes | null>(null);
  const [connectedWallet, setConnectedWallet] = useState<WalletTypes | null>(
    null
  );

  /**
   * Handles the wallet selection process.
   * Sets the loading state, attempts to connect to the wallet, and updates the connected wallet state.
   *
   * @param {WalletTypes} wallet - The selected wallet type.
   */
  const handleWalletClick = async (wallet: WalletTypes) => {
    setLoadingWallet(wallet);
    try {
      await onWalletClick(wallet);
      setConnectedWallet(wallet);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    } finally {
      setLoadingWallet(null);
    }
  };

  /**
   * Resets the loading and connected wallet state when the modal is reopened.
   */
  useEffect(() => {
    setLoadingWallet(null);
    setConnectedWallet(null);
  }, [open]);

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <ModalHeader>
        <h2 className="text-xl text-text-primary font-semibold">
          {connectedWallet ? "Wallet Connected" : "Connect Wallet"}
        </h2>
        {!connectedWallet && (
          <p className="text-text-secondary">
            Start by connecting with one of the wallets below.
          </p>
        )}
      </ModalHeader>
      <ModalBody>
        {/* Display available wallets if no wallet is loading or connected */}
        {!loadingWallet && !connectedWallet && (
          <div>
            {Object.keys(walletDetails).map((wallet) => (
              <button
                key={wallet}
                className="w-full flex items-center p-3 mb-3 border border-border-primary rounded-lg transition-transform transform hover:scale-105 hover:bg-background-interactive-hover"
                onClick={() => handleWalletClick(wallet as WalletTypes)} // Type assertion to specify wallet type
              >
                <Image
                  className="mr-4 w-8 h-8"
                  alt={`${walletDetails[wallet as WalletTypes].name} icon`} // Type assertion to specify wallet type
                  src={walletDetails[wallet as WalletTypes].icon} // Type assertion to specify wallet type
                />
                <p className="text-lg text-text-primary">
                  {walletDetails[wallet as WalletTypes].name}
                </p>
              </button>
            ))}
          </div>
        )}
        {/* Display loading animation if a wallet is being connected */}
        {loadingWallet && !connectedWallet && (
          <div className="flex flex-col items-center justify-center">
            <motion.div className="relative w-20 h-20 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 border-4 border-transparent border-t-text-brand rounded-full"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ ease: "linear", duration: 1, repeat: Infinity }}
              />
              <Image
                className="w-12 h-12"
                alt={`${walletDetails[loadingWallet].name} icon`}
                src={walletDetails[loadingWallet].icon}
              />
            </motion.div>
            <p className="mt-4 text-text-secondary">
              Connecting to {walletDetails[loadingWallet].name}...
            </p>
          </div>
        )}
        {/* Display success message if a wallet is connected */}
        {connectedWallet && (
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="relative w-20 h-20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                className="w-12 h-12"
                alt={`${walletDetails[connectedWallet].name} icon`}
                src={walletDetails[connectedWallet].icon}
              />
            </motion.div>
            <p className="mt-4 text-text-interactive-valid">
              Connected to {walletDetails[connectedWallet].name}!
            </p>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <button
          className="w-full"
          onClick={() => setOpen(false)}
          disabled={loadingWallet !== null}
        >
          {connectedWallet ? "Close" : "Cancel"}
        </button>
      </ModalFooter>
    </Modal>
  );
}
