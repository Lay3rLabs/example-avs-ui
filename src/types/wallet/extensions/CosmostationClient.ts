import { Algo } from "@cosmjs/proto-signing";
import { Keplr } from "@keplr-wallet/types";

export interface CosmostationSignOptions {
  readonly preferNoSetFee?: boolean;
  readonly preferNoSetMemo?: boolean;
  readonly disableBalanceCheck?: boolean;
}

export interface Request {
  method: string;
  params?: object;
}

export interface Cosmos {
  request(request: Request): Promise<unknown>;
  on(type: string, listener: EventListenerOrEventListenerObject): Event;
  off(event: Event): void;
}

export interface CosmostationClient {
  cosmos: Cosmos;
  providers: {
    keplr: Keplr;
  };
}

export type RequestAccountResponse = {
  name: string;
  address: string;
  publicKey: Uint8Array;
  isLedger: boolean;
  algo: Algo;
};
