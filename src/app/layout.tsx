"use client";
import "./styles/globals.css";
import "material-icons/iconfont/material-icons.css";
import { Inter } from "next/font/google";
import Sidenav from "@/components/Sidenav/Sidenav";
import Topnav from "@/components/Topnav/Topnav";
import { WalletModal } from "@/components/WalletModal/WalletModal";
import { useEffect, useState } from "react";
import { rehydrateClient, useAppStore } from "@/state/store";
import { WalletTypes } from "@/types";
import { FaucetModal } from "@/components/FaucetModal/FaucetModal";
import { fetchUserBalance } from "@/utils/cosmjs/user/fetchUserBalance";
import { callFaucet, microAmountToAmount, taskQueueAddresses } from "@/utils";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

/**
 * RootLayout component for the main layout structure of the application.
 *
 * @component
 * @param {Object} props - Properties to configure the RootLayout component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the layout.
 * @returns {React.ReactElement} The rendered RootLayout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Modal States
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false);
  const [faucetModalOpen, setFaucetModalOpen] = useState<boolean>(false);

  // User balance state
  const [userBalance, setUserBalance] = useState<number | undefined>(0);

  // App store for wallet states
  const appStore = useAppStore();

  const pathname = usePathname();

  /**
   * Connect to the selected wallet.
   *
   * @param {WalletTypes} walletType - The type of wallet to connect to.
   * @returns {Promise<void>}
   */
  const connectWallet = async (walletType: WalletTypes): Promise<void> => {
    return await appStore.connectWallet(walletType, "prod");
  };

  /**
   * Fetch user balance from the blockchain.
   *
   * @param {string} userAddress - The address of the user.
   * @returns {Promise<Object>} The fetched balance object.
   */
  const fetchBalance = async (userAddress: string) => {
    const balance = await fetchUserBalance(userAddress, "uperm");
    setUserBalance(Number(microAmountToAmount(balance.amount, 6)));
    return balance;
  };

  /**
   * Handle faucet logic: if balance is zero, open the faucet modal.
   */
  const handleFaucet = async () => {
    if (appStore.wallet.address) {
      const balance = await fetchBalance(appStore.wallet.address);
      if (balance.amount === "0") {
        setFaucetModalOpen(true);
      }
    }
  };

  /**
   * Request tokens from the faucet and update the balance.
   */
  const requestTokens = async () => {
    await callFaucet(appStore.wallet.address);

    // Wait for next block
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 400); // Simulate a .4-second delay for the wallet connection
    });

    await fetchBalance(appStore.wallet.address);
  };

  // Rehydrate cosmwasm client after page reload
  useEffect(() => {
    rehydrateClient();
  }, []);

  // Fetch balance on wallet address change
  useEffect(() => {
    if (appStore.wallet.address) {
      fetchBalance(appStore.wallet.address);
    }
  }, [appStore.wallet.address]);

  return (
    <html lang="en">
      <body className={`${inter.className} dark antialiased`}>
        <div className="flex h-[calc(100vh-32px)]">
          <Sidenav
            navItems={taskQueueAddresses.map((item) => ({
              label: item.title,
              icon: "arrow_forward_ios",
              active: pathname.includes(item.address),
              href: `/avs/oracle/${item.address}`,
            }))}
          />
          <div className="w-full">
            <Topnav
              walletAddress={appStore.wallet.address}
              onConnectWalletClick={() => setWalletModalOpen(true)}
              onDisconnectWalletClick={() => appStore.disconnectWallet()}
              navItems={[
                "Services",
                taskQueueAddresses.find((task) =>
                  pathname.includes(task.address)
                )?.title || "",
              ]}
              userBalance={userBalance}
            />
            <div className="p-6 overflow-y-scroll max-h-[calc(100vh-65px)]">
              {children}
            </div>
          </div>
        </div>
        <WalletModal
          onWalletClick={async (walletType) => await connectWallet(walletType)}
          open={walletModalOpen}
          setOpen={(open) => {
            setWalletModalOpen(open);
            handleFaucet();
          }}
        />

        <FaucetModal
          open={faucetModalOpen}
          setOpen={(open) => setFaucetModalOpen(open)}
          requestTokens={() => requestTokens()}
        />
      </body>
    </html>
  );
}
