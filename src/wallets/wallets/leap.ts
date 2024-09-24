import { Algo, OfflineDirectSigner } from "@cosmjs/proto-signing";
import { chainRegistryChainToKeplr } from "@chain-registry/keplr";
import { StdSignature, StdSignDoc } from "@cosmjs/amino";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { WalletTypes } from "@/types";
import { MainnetConfig } from "@/lib/utils";
import { GasPrice, SigningStargateClient } from "@cosmjs/stargate";

export class Leap implements WalletTypes.Wallet {
  readonly client: WalletTypes.LeapClient;
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

  constructor(client: WalletTypes.LeapClient) {
    this.client = client;
  }

  async enable(chainIds: string | string[]) {
    await this.client.enable(chainIds);
  }

  async suggestToken({ chainId, tokens, type }: WalletTypes.SuggestToken) {
    if (type === "cw20") {
      for (const { contractAddress } of tokens) {
        await this.client.suggestToken(chainId, contractAddress);
      }
    }
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

  async disconnect() {
    await this.client.disconnect();
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

  getOfflineSignerAmino(chainId: string) {
    return this.client.getOfflineSignerOnlyAmino(chainId);
  }

  getOfflineSignerDirect(chainId: string) {
    return this.client.getOfflineSigner(chainId) as OfflineDirectSigner;
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

  async sendTx(
    chainId: string,
    tx: Uint8Array,
    mode: WalletTypes.BroadcastMode
  ) {
    return await this.client.sendTx(chainId, tx, mode);
  }
}

interface LeapWindow {
  leap?: WalletTypes.LeapClient;
}

export const getLeapFromExtension: () => Promise<
  WalletTypes.LeapClient | undefined
> = async () => {
  if (typeof window === "undefined") {
    return void 0;
  }

  const leap = (window as LeapWindow).leap;

  if (leap) {
    return leap;
  }

  if (document.readyState === "complete") {
    if (leap) {
      return leap;
    } else {
      throw "ClientNotExistError";
    }
  }

  return new Promise((resolve, reject) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        if (leap) {
          resolve(leap);
        } else {
          reject("ClientNotExistError");
        }
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
};
