import { WalletTypes } from "@/types";
import {
  Cosmostation,
  Keplr,
  Leap,
  getCosmostationFromExtension,
  getKeplrFromExtension,
  getLeapFromExtension,
} from "./wallets";

export async function getWalletClient(walletId: WalletTypes.WalletTypes) {
  // Switch case for different wallet types
  switch (walletId) {
    // Case for Leap Wallet
    case WalletTypes.WalletTypes.Leap:
      const LeapClient = await getLeapFromExtension();
      if (!LeapClient) throw new Error("No Leap client found");
      const LeapWalletClient = new Leap(LeapClient);

      return LeapWalletClient;

    // Case for Cosmostation Wallet
    case WalletTypes.WalletTypes.Cosmostation:
      const CosmoStationClient = await getCosmostationFromExtension();
      if (!CosmoStationClient) throw new Error("No Cosmostation client found");
      const CosmostationWalletClient = new Cosmostation(CosmoStationClient);

      return CosmostationWalletClient;

    // Case for Keplr Wallet
    case WalletTypes.WalletTypes.Keplr:
      const KeplrClient = await getKeplrFromExtension();
      if (!KeplrClient) throw new Error("No Keplr client found");
      const KeplrWalletClient = new Keplr(KeplrClient);

      return KeplrWalletClient;
    default:
      break;
  }
}
