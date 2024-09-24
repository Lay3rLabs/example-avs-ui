import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { WalletTypes } from "../wallet";
// import { RedexPoolTypes } from "@/lib/contracts"; Todo
import { Token } from "../general";

export interface WalletActions {
  connectWallet: (type: WalletTypes, env: "dev" | "prod") => Promise<void>;
  disconnectWallet: () => void;
  cosmWasmSigningClient: SigningCosmWasmClient | undefined;
  fetchTokenBalance: (asset: unknown) => Promise<Token>;
  fetchTokenBalances: (assets: unknown[]) => Promise<Token[]>;
  tokens: Token[];
  wallet: {
    address: string;
    isConnected?: boolean;
    type: WalletTypes;
  };
}

export interface WalletPersistActions {
  type: WalletTypes;
  isConnected?: boolean;
}
