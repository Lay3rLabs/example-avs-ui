/* eslint-disable @next/next/no-img-element */
"use client";

import { TopnavProps } from "@/types/ui";
import React, { useEffect, useState } from "react";

/**
 * Topnav component for rendering a top navigation bar.
 *
 * @component
 * @param {TopnavProps} props - Properties to configure the Topnav component.
 * @returns {React.ReactElement} The rendered Topnav component.
 */
const Topnav: React.FC<TopnavProps> = (props) => {
  const [logoutWindowOpen, setLogoutWindowOpen] = useState<boolean>(false);

  useEffect(() => {
    setLogoutWindowOpen(false);
  }, [props.walletAddress]);

  return (
    <div className="w-full px-6 bg-background">
      <div className="border-b border-b-border-primary flex">
        <ul className="space-x-2 font-medium flex py-[18px] flex-1">
          {props.navItems &&
            props.navItems.map((item: string, index: number) => (
              <li key={index}>
                <div className="flex items-center mr-3">
                  <p className="text-text-primary font-semibold text-xl cursor-pointer select-none hover:underline">
                    {item}
                  </p>
                  {index < props.navItems.length - 1 && (
                    <span className="material-icons text-background-interactive-hover ml-3">
                      arrow_forward_ios
                    </span>
                  )}
                </div>
              </li>
            ))}
        </ul>
        <div className="border-l border-l-border-primary flex items-center relative">
          {props.walletAddress ? (
            <>
              {props.userBalance !== undefined && (
                <div className="flex items-center text-text-primary text-sm font-semibold ml-4 mr-4">
                  <span className="mr-1">{props.userBalance.toFixed(2)}</span>
                  <span className="text-text-secondary">LAYER</span>
                </div>
              )}
              <div className="w-9 h-9 overflow-hidden rounded-md mr-2">
                <img
                  className="max-w-full"
                  src={`https://api.dicebear.com/9.x/glass/svg?seed=${props.walletAddress}`}
                  alt="User Avatar"
                />
              </div>
              <p className="text-text-primary text-sm mr-2">
                {props.walletAddress.slice(0, 4)}...
                {props.walletAddress.slice(-4)}
              </p>
              <button
                onClick={() => setLogoutWindowOpen(!logoutWindowOpen)}
                className="text-text-body mr-2 h-6"
              >
                <span className="material-icons">keyboard_arrow_down</span>
              </button>
            </>
          ) : (
            <button
              onClick={props.onConnectWalletClick}
              className="text-text-primary rounded-md ml-4 mr-2 text-sm py-2 px-2 font-bold bg-background-brand flex items-center"
            >
              <span className="material-icons mr-1">sensors</span>
              <span>Connect to Wallet</span>
            </button>
          )}

          {logoutWindowOpen && (
            <div className="absolute right-0 border-b border-l border-r border-border-primary rounded-b-md top-[65px]">
              <button
                onClick={props.onDisconnectWalletClick}
                className="text-text-primary text-sm py-2 px-2 font-bold hover:bg-background-interactive-hover"
              >
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topnav;
