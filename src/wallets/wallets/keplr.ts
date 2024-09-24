import { chainRegistryChainToKeplr } from "@chain-registry/keplr";
import { OfflineAminoSigner, StdSignature, StdSignDoc } from "@cosmjs/amino";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Algo, OfflineDirectSigner } from "@cosmjs/proto-signing";
import { GasPrice, SigningStargateClient } from "@cosmjs/stargate";
import {
  BroadcastMode,
  Keplr as K,
  Window as KeplrWindow,
} from "@keplr-wallet/types";
import { WalletTypes } from "@/types";
import { MainnetConfig } from "@/lib/utils";

export class Keplr implements WalletTypes.Wallet {
  readonly client: K;
  private _defaultSignOptions: WalletTypes.SignOptions = {
    preferNoSetFee: false,
    preferNoSetMemo: true,
    disableBalanceCheck: true,
  };

  get defaultSignOptions() {
    return this._defaultSignOptions;
  }

  setDefaultSignOptions(options: WalletTypes.SignOptions) {
    this._defaultSignOptions = options;
  }

  constructor(client: K) {
    this.client = client;
  }

  async enable(chainIds: string | string[]) {
    await this.client.enable(chainIds);
  }

  async getSigningCosmWasmClient(): Promise<SigningCosmWasmClient> {
    return SigningCosmWasmClient.connectWithSigner(
      MainnetConfig.rpc_endpoint,
      this.getOfflineSigner(MainnetConfig.chain_id),
      {
        gasPrice: GasPrice.fromString("0.025utestcore"),
      }
    );
  }

  async getSigningStargateClient(
    envConfig: any
  ): Promise<SigningStargateClient> {
    return SigningStargateClient.connectWithSigner(
      MainnetConfig.rpc_endpoint,
      this.getOfflineSigner(MainnetConfig.chain_id),
      {
        gasPrice: GasPrice.fromString("0.025utestcore"),
      }
    );
  }

  async suggestToken({ chainId, tokens, type }: WalletTypes.SuggestToken) {
    if (type === "cw20") {
      for (const { contractAddress, viewingKey } of tokens) {
        await this.client.suggestToken(chainId, contractAddress, viewingKey);
      }
    }
  }

  async getSimpleAccount(chainId: string) {
    const { address, username } = await this.getAccount(chainId);
    return {
      namespace: "cosmos",
      chainId,
      address,
      username,
    };
  }

  async getAccount(chainId: string) {
    const key = await this.client.getKey(chainId);
    return {
      username: key.name,
      address: key.bech32Address,
      algo: key.algo as Algo,
      pubkey: key.pubKey,
    };
  }

  getOfflineSigner(chainId: string, preferredSignType?: WalletTypes.SignType) {
    switch (preferredSignType) {
      case "amino":
        return this.getOfflineSignerAmino(chainId);
      case "direct":
        return this.getOfflineSignerDirect(chainId);
      default:
        return this.getOfflineSignerAmino(chainId);
    }
    // return this.client.getOfflineSignerAuto(chainId);
  }

  getOfflineSignerAmino(chainId: string): OfflineAminoSigner {
    return {
      getAccounts: async () => {
        return [await this.getAccount(chainId)];
      },
      signAmino: async (signerAddress, signDoc) => {
        return this.signAmino(
          chainId,
          signerAddress,
          signDoc,
          this.defaultSignOptions
        );
      },
    };
    // return this.client.getOfflineSignerOnlyAmino(chainId);
  }

  getOfflineSignerDirect(chainId: string): OfflineDirectSigner {
    return {
      getAccounts: async () => {
        return [await this.getAccount(chainId)];
      },
      signDirect: async (signerAddress, signDoc) => {
        return this.signDirect(
          chainId,
          signerAddress,
          signDoc,
          this.defaultSignOptions
        );
      },
    };
    // return this.client.getOfflineSigner(chainId) as OfflineDirectSigner;
  }

  async addChain(chainInfo: WalletTypes.ChainRecord) {
    const suggestChain = chainRegistryChainToKeplr(
      chainInfo.chain,
      chainInfo.assetList ? [chainInfo.assetList] : []
    );

    if (chainInfo.preferredEndpoints?.rest?.[0]) {
      (suggestChain.rest as string | WalletTypes.ExtendedHttpEndpoint) =
        chainInfo.preferredEndpoints?.rest?.[0];
    }

    if (chainInfo.preferredEndpoints?.rpc?.[0]) {
      (suggestChain.rpc as string | WalletTypes.ExtendedHttpEndpoint) =
        chainInfo.preferredEndpoints?.rpc?.[0];
    }

    await this.client.experimentalSuggestChain(suggestChain);
  }

  async signAmino(
    chainId: string,
    signer: string,
    signDoc: StdSignDoc,
    signOptions?: WalletTypes.SignOptions
  ) {
    return await this.client.signAmino(
      chainId,
      signer,
      signDoc,
      signOptions || this.defaultSignOptions
    );
  }

  async signArbitrary(
    chainId: string,
    signer: string,
    data: string | Uint8Array
  ): Promise<StdSignature> {
    return await this.client.signArbitrary(chainId, signer, data);
  }

  async signDirect(
    chainId: string,
    signer: string,
    signDoc: WalletTypes.DirectSignDoc,
    signOptions?: WalletTypes.SignOptions
  ) {
    return await this.client.signDirect(
      chainId,
      signer,
      signDoc,
      signOptions || this.defaultSignOptions
    );
  }

  async sendTx(chainId: string, tx: Uint8Array, mode: BroadcastMode) {
    return await this.client.sendTx(chainId, tx, mode);
  }
}

export const getKeplrFromExtension: () => Promise<K | undefined> = async () => {
  if (typeof window === "undefined") {
    return void 0;
  }

  const keplr = (window as KeplrWindow).keplr;

  if (keplr) {
    return keplr;
  }

  if (document.readyState === "complete") {
    if (keplr) {
      return keplr;
    } else {
      throw "Keplr not installed";
    }
  }

  return new Promise((resolve, reject) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        const keplr = (window as KeplrWindow).keplr;
        
        if (keplr) {
          resolve(keplr);
        } else {
          reject("Keplr not installed");
        }
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
};
