import { create } from "zustand";
import { AppStore } from "../types";
import { createWalletActions } from "./wallet/actions";

// TODO: AppStore Persist for Wallet handling
export const useAppStore = create<AppStore>()((set, get) => {
  const wallet = createWalletActions(set, get);

  return {
    ...wallet,
  };
});
