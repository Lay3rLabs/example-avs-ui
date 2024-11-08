import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AppStore } from "../types";
import { createWalletActions } from "./wallet/actions";
import { getWalletClient } from "@/wallets";
import { HacknetConfig } from "@/utils";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => {
      const wallet = createWalletActions(set, get);

      return {
        ...wallet,
      };
    },
    {
      name: "wallet-storage",
      partialize: (state) => ({ wallet: state.wallet }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const rehydrateClient = async () => {
  const { wallet } = useAppStore.getState();

  if (wallet.isConnected && wallet.address) {
    const walletClient = await getWalletClient(wallet.type);
    const envConfig = HacknetConfig;

    if (walletClient) {
      await walletClient.enable(envConfig.chain_id);
      const cosmWasmClient: SigningCosmWasmClient =
        await walletClient.getSigningCosmWasmClient();

      useAppStore.setState((state: AppStore) => ({
        ...state,
        cosmWasmSigningClient: cosmWasmClient,
      }));
    }
  }
};
