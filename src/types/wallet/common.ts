import {
  SigningCosmWasmClientOptions,
  HttpEndpoint,
} from "@cosmjs/cosmwasm-stargate";
import { AccountData } from "@cosmjs/amino";
import { AssetList, Chain } from "@chain-registry/types";

import {
  SigningStargateClientOptions,
  StargateClientOptions,
} from "@cosmjs/stargate";

export enum State {
  Init = "Init",
  Pending = "Pending",
  Done = "Done",
  Error = "Error",
}

export interface Mutable<T> {
  state: State;
  data?: T;
  message?: string;
}

export interface SimpleAccount {
  namespace: string;
  chainId: string;
  address: string;
  username?: string;
}

export interface AppUrl {
  native?:
    | string
    | {
        android?: string;
        ios?: string;
        macos?: string;
        windows?: string;
      };
  universal?: string;
}

export interface SuggestCW20Token {
  contractAddress: string;
  viewingKey?: string;
  imageURL?: string;
  coinGeckoId?: string;
}

export const SuggestTokenTypes = {
  CW20: "cw20",
  ERC20: "erc20",
} as const;

export type SuggestTokenType =
  (typeof SuggestTokenTypes)[keyof typeof SuggestTokenTypes];

export interface SuggestToken {
  chainId: string;
  chainName: string;
  type: SuggestTokenType;
  tokens: SuggestCW20Token[];
}

export interface ExtendedHttpEndpoint extends HttpEndpoint {
  isLazy?: boolean;
}

export interface Endpoints {
  rpc?: (string | ExtendedHttpEndpoint)[];
  rest?: (string | ExtendedHttpEndpoint)[];
  isLazy?: boolean;
}

export interface SignOptions {
  readonly preferNoSetFee?: boolean;
  readonly preferNoSetMemo?: boolean;
  readonly disableBalanceCheck?: boolean;
}

export type ChainName = string;
export type SignType = "amino" | "direct";

export interface ChainRecord {
  name: ChainName;
  chain: Chain;
  assetList?: AssetList;
  clientOptions?: {
    signingStargate?: SigningStargateClientOptions;
    signingCosmwasm?: SigningCosmWasmClientOptions;
    stargate?: StargateClientOptions;
    preferredSignType?: SignType;
  };
  preferredEndpoints?: Endpoints;
}

export interface DirectSignDoc {
  /** SignDoc bodyBytes */
  bodyBytes?: Uint8Array | null;
  /** SignDoc authInfoBytes */
  authInfoBytes?: Uint8Array | null;
  /** SignDoc chainId */
  chainId?: string | null;
  /** SignDoc accountNumber */
  accountNumber?: Long | null;
}

export declare enum BroadcastMode {
  /** Return after tx commit */
  Block = "block",
  /** Return after CheckTx */
  Sync = "sync",
  /** Return right away */
  Async = "async",
}

export interface WalletAccount extends AccountData {
  username?: string;
  isNanoLedger?: boolean;
  isSmartContract?: boolean;
}
