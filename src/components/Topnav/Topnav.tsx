import classNames from "classnames";
import React, { useState } from "react";

export interface TopnavItemProps {
  label: string;
  href: string;
}

export interface TopnavProps {
  navItems: TopnavItemProps[];
  walletAddress: string | undefined;
  onConnectWalletClick: () => void;
  onDisconnectWalletClick: () => void;
}

const Topnav: React.FC<TopnavProps> = (props) => {
  const [logoutWindowOpen, setLogoutWindowOpen] = useState<boolean>(false);

  return (
    <div className="w-full px-6 bg-background">
      <div className="border-b border-b-border-primary flex">
        <ul className="space-x-2 font-medium flex py-[18px] flex-1">
          {props.navItems &&
            props.navItems.map((item: TopnavItemProps, index: number) => (
              <li key={index}>
                <div className="flex items-center mr-4">
                  <a className="text-text-primary font-semibold text-xl cursor-pointer select-none hover:underline">
                    {item.label}
                  </a>
                </div>
              </li>
            ))}
        </ul>
        <div className="border-l border-l-border-primary flex items-center relative">
          {props.walletAddress ? (
            <>
              <div className="w-9 h-9 overflow-hidden rounded-md ml-4 mr-2">
                <img
                  className="max-w-full"
                  src={`https://api.dicebear.com/9.x/glass/svg?seed=${props.walletAddress}`}
                />
              </div>
              <p className="text-text-primary text-sm mr-2">
                {props.walletAddress.slice(0, 4)}...
                {props.walletAddress.slice(-4)}
              </p>
              <button onClick={() => setLogoutWindowOpen(!logoutWindowOpen)} className="text-text-body mr-2">v</button>
            </>
          ) : (
            <button onClick={() => props.onConnectWalletClick} className="text-text-primary rounded-md ml-4 mr-2 text-sm py-2 px-2 font-bold hover:bg-background-interactive-hover">Connect Wallet</button>
          )}

          <div className={classNames("absolute right-0 hidden border-b border-l border-r border-border-primary rounded-b-md top-[65px]", { "!block": logoutWindowOpen })}>
            <button onClick={() => props.onDisconnectWalletClick} className="text-text-primary text-sm py-2 px-2 font-bold hover:bg-background-interactive-hover">Disconnect Wallet</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topnav;
