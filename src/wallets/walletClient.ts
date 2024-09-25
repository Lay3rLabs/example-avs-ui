import { WalletTypes } from "@/types";
import {
  Keplr,
  Leap,
  getKeplrFromExtension,
  getLeapFromExtension,
} from "./wallets";

/**
 * Retrieves a wallet client instance based on the provided wallet type.
 *
 * To add support for a new wallet:
 * 1. Add the new wallet type to the `WalletTypes` enum in `types.ts`.
 * 2. Create a new class implementing the `Wallet` interface for the new wallet (e.g., `MyNewWallet`).
 * 3. Create a function to retrieve the wallet client (e.g., `getMyNewWalletFromExtension`).
 * 4. Add a new case in the switch statement below to handle the new wallet type.
 *
 * @param walletId - The type of wallet to retrieve (e.g., WalletTypes.Keplr, WalletTypes.Leap).
 * @returns A promise that resolves to a wallet client instance.
 * @throws An error if the specified wallet client is not found.
 */
export async function getWalletClient(walletId: WalletTypes) {
  switch (walletId) {
    case WalletTypes.Leap:
      const LeapClient = await getLeapFromExtension();
      if (!LeapClient) throw new Error("No Leap client found");
      return new Leap(LeapClient);

    case WalletTypes.Keplr:
      const KeplrClient = await getKeplrFromExtension();
      if (!KeplrClient) throw new Error("No Keplr client found");
      return new Keplr(KeplrClient);

    // Add a new case here for the new wallet
    // case WalletTypes.MyNewWallet:
    //   const MyNewWalletClient = await getMyNewWalletFromExtension();
    //   if (!MyNewWalletClient) throw new Error("No MyNewWallet client found");
    //   return new MyNewWallet(MyNewWalletClient);

    default:
      throw new Error("Unsupported wallet type");
  }
}
