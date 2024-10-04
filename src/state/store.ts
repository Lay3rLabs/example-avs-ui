import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AppStore } from "../types";
import { createWalletActions } from "./wallet/actions";

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
