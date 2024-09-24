import { WalletTypes } from "@/types";
import {
  Keplr,
  Leap,
  getKeplrFromExtension,
  getLeapFromExtension,
} from "./wallets";

export async function getWalletClient(walletId: WalletTypes) {
  // Switch case for different wallet types
  switch (walletId) {
    // Case for Leap Wallet
    case WalletTypes.Leap:
      const LeapClient = await getLeapFromExtension();
      if (!LeapClient) throw new Error("No Leap client found");
      const LeapWalletClient = new Leap(LeapClient);

      return LeapWalletClient;

    // Case for Keplr Wallet
    case WalletTypes.Keplr:
      const KeplrClient = await getKeplrFromExtension();
      if (!KeplrClient) throw new Error("No Keplr client found");
      const KeplrWalletClient = new Keplr(KeplrClient);

      return KeplrWalletClient;
    default:
      break;
  }
}
