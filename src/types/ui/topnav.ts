export interface TopnavProps {
  navItems: string[];
  walletAddress: string | undefined;
  onConnectWalletClick: () => void;
  onDisconnectWalletClick: () => void;
  userBalance: number | undefined;
}
