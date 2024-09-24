import {
  AccountData,
  AminoSignResponse,
  OfflineAminoSigner,
  StdSignature,
  StdSignDoc,
} from "@cosmjs/amino";
import {
  DirectSignResponse,
  OfflineDirectSigner,
  OfflineSigner,
} from "@cosmjs/proto-signing";
import {
  AppUrl,
  BroadcastMode,
  ChainRecord,
  DirectSignDoc,
  Mutable,
  SignOptions,
  SignType,
  SimpleAccount,
  SuggestToken,
  WalletAccount,
} from "./common";

export interface Wallet {
  getSimpleAccount: (chainId: string) => Promise<SimpleAccount>;

  qrUrl?: Mutable<string>;
  appUrl?: Mutable<AppUrl>;

  connect?: (chainIds: string | string[]) => Promise<void>; // called when chain wallet connect is called
  disconnect?: () => Promise<void>; // called when wallet disconnect is called
  on?: (type: string, listener: EventListenerOrEventListenerObject) => void;
  off?: (type: string, listener: EventListenerOrEventListenerObject) => void;
  enable?: (chainIds: string | string[]) => Promise<void>;
  suggestToken?: (data: SuggestToken) => Promise<void>;
  addChain?: (chainInfo: ChainRecord) => Promise<void>;
  getAccount?: (chainId: string) => Promise<WalletAccount>;
  getOfflineSigner?: (
    chainId: string,
    preferredSignType?: SignType // by default `amino`
  ) => Promise<OfflineSigner> | OfflineSigner;
  getOfflineSignerAmino?: (chainId: string) => OfflineAminoSigner;
  getOfflineSignerDirect?: (chainId: string) => OfflineDirectSigner;

  readonly defaultSignOptions?: SignOptions;
  setDefaultSignOptions?: (options: SignOptions) => void;

  sign?: (
    signDoc: StdSignDoc,
    accountIndex?: number
  ) => Promise<{
    signature: null | Buffer;
    return_code: number | string;
  }>;
  signAmino?: (
    chainId: string,
    signer: string,
    signDoc: StdSignDoc,
    signOptions?: SignOptions
  ) => Promise<AminoSignResponse>;
  signDirect?: (
    chainId: string,
    signer: string,
    signDoc: DirectSignDoc,
    signOptions?: SignOptions
  ) => Promise<DirectSignResponse>;
  signArbitrary?: (
    chainId: string,
    signer: string,
    data: string | Uint8Array
  ) => Promise<StdSignature>;
  getEnigmaPubKey?: (chainId: string) => Promise<Uint8Array>;
  getEnigmaTxEncryptionKey?: (
    chainId: string,
    nonce: Uint8Array
  ) => Promise<Uint8Array>;
  enigmaEncrypt?: (
    chainId: string,
    contractCodeHash: string,
    msg: object
  ) => Promise<Uint8Array>;
  enigmaDecrypt?: (
    chainId: string,
    ciphertext: Uint8Array,
    nonce: Uint8Array
  ) => Promise<Uint8Array>;
  sendTx?: (
    chainId: string,
    tx: Uint8Array,
    mode: BroadcastMode
  ) => Promise<Uint8Array>;
}
