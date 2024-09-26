export interface TopnavItemProps {
  label: string;
  href: string;
}

export interface TopnavProps {
  navItems: TopnavItemProps[];
  walletAddress: string | undefined;
  onConnectWalletClick: () => void;
  onDisconnectWalletClick: () => void;
  userBalance: number | undefined;
}
