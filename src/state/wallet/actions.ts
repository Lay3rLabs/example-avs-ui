import {
  AppStore,
  GetStateType,
  SetStateType,
  Token,
  WalletActions,
  WalletTypes,
} from "@/types";
import { chainRegistryEntry, MainnetConfig } from "@/utils";
import { getWalletClient, Keplr, Leap } from "@/wallets";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useAppStore } from "../store";

// Function to update the global state
const updateState = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  account: any,
  walletType: WalletTypes,
  cosmWasmClient: SigningCosmWasmClient
) => {
  useAppStore.setState((state: AppStore) => ({
    ...state,
    wallet: {
      address: account.address,
      isConnected: true,
      type: walletType,
    },
    cosmWasmSigningClient: cosmWasmClient,
  }));
};

// Generic function to connect to a wallet
const connectWalletGeneric = async (
  walletClient: Leap | Keplr | undefined,
  envConfig: {
    rpc_endpoint: string;
    lcd_endpoint: string;
    chain_id: string;
    native_denom: string;
  },
  walletType: WalletTypes
) => {
  if (walletClient instanceof Keplr) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await window.keplr.experimentalSuggestChain(chainRegistryEntry);
  } else if (walletClient instanceof Leap) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await window.leap.experimentalSuggestChain(chainRegistryEntry);
  }

  await walletClient!.enable(envConfig.chain_id);

  const account = await walletClient!.getAccount(envConfig.chain_id);
  const cosmWasmClient: SigningCosmWasmClient =
    await walletClient!.getSigningCosmWasmClient();
  updateState(account, walletType, cosmWasmClient);
};

// Main function to create wallet actions
export const createWalletActions = (
  setState: SetStateType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getState: GetStateType
): WalletActions => {
  return {
    // Initialize default state
    wallet: {
      address: "",
      isConnected: false,
      type: WalletTypes.Leap,
    },
    cosmWasmSigningClient: undefined,
    tokens: [],

    // Function to connect wallet
    connectWallet: async (walletId: WalletTypes) => {
      // Determine environment configuration
      const envConfig = MainnetConfig;

      const walletClient = await getWalletClient(walletId);

      await connectWalletGeneric(walletClient, envConfig, walletId);

      useAppStore.persist.rehydrate();
    },
    // Function to disconnect wallet (placeholder)
    disconnectWallet: () => {
      setState((state: AppStore) => ({
        ...state,
        wallet: {
          address: "",
          isConnected: false,
          type: WalletTypes.Leap,
        },
        cosmWasmSigningClient: undefined,
      }));

      useAppStore.persist.clearStorage();
    },

    // TODO Fetch token
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchTokenBalance: async (asset: unknown) => {
      return {} as Token;
    },

    // TODO Fetch multiple tokens
    fetchTokenBalances: async (assets: unknown[]) => {
      const tokens = await Promise.all(
        assets.map(
          async (asset) => await useAppStore().fetchTokenBalance(asset)
        )
      );
      return tokens;
    },
  };
};
