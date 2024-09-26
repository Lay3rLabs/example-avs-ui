"use client";
import "./styles/globals.css";
import "material-icons/iconfont/material-icons.css";
import { Inter } from "next/font/google";
import Sidenav from "@/components/Sidenav/Sidenav";
import Topnav from "@/components/Topnav/Topnav";
import { WalletModal } from "@/components/WalletModal/WalletModal";
import { useState } from "react";
import { useAppStore } from "@/state/store";
import { WalletTypes } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false);

  const appStore = useAppStore();

  const connectWallet = async (walletType: WalletTypes): Promise<void> => {
    return await appStore.connectWallet(walletType, "prod");
  };

  return (
    <html lang="en">
      <body className={`${inter.className} dark antialiased`}>
        <div className="flex h-[calc(100vh-32px)]">
          <Sidenav
            navItems={[
              {
                label: "Nav Item 1",
                icon: "arrow_forward_ios",
                active: true,
                href: "#",
              },
              {
                label: "Nav Item 2",
                icon: "arrow_forward_ios",
                active: false,
                href: "#",
              },
            ]}
          />
          <div className="w-full">
            <Topnav
              walletAddress={appStore.wallet.address}
              onConnectWalletClick={() => {
                setWalletModalOpen(true);
              }}
              onDisconnectWalletClick={() => {
                appStore.disconnectWallet();
              }}
              navItems={[
                {
                  label: "Services",
                  href: "#",
                },
                {
                  label: "AI Agents",
                  href: "#",
                },
                {
                  label: "Steven",
                  href: "#",
                },
              ]}
            />
            <div className="p-6 overflow-y-scroll max-h-[calc(100vh-65px)]">
              {children}
            </div>
          </div>
        </div>
        <WalletModal
          onWalletClick={async (walletType) => await connectWallet(walletType)}
          open={walletModalOpen}
          setOpen={(open) => setWalletModalOpen(open)}
        />
      </body>
    </html>
  );
}
