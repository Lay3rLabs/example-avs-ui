import { WalletActions, WalletPersistActions } from "./walletActions";

export type AppStore = WalletActions;
export type AppStorePersist = WalletPersistActions;

export type SetStateType = (
  partial:
    | AppStore
    | Partial<AppStore>
    | ((state: AppStore) => AppStore | Partial<AppStore>),
  replace?: false | undefined
) => void;

export type GetStateType = () => AppStore;
