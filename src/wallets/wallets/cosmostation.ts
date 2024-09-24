import { WalletTypes } from "@/types";
import { Algo, OfflineDirectSigner } from "@cosmjs/proto-signing";
import { chainRegistryChainToKeplr } from "@chain-registry/keplr";
import { StdSignature, StdSignDoc } from "@cosmjs/amino";
import { chainRegistryChainToCosmostation } from "@chain-registry/cosmostation";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { MainnetConfig } from "@/lib/utils";
import { GasPrice, SigningStargateClient } from "@cosmjs/stargate";

interface CosmostationWindow {
  cosmostation?: WalletTypes.CosmostationClient;
}

export class Cosmostation implements WalletTypes.Wallet {
  readonly client: WalletTypes.CosmostationClient;
  private eventMap: Map<
    string,
    Map<EventListenerOrEventListenerObject, Event>
  > = new Map();
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

  constructor(client: WalletTypes.CosmostationClient) {
    this.client = client;
  }

  get cosmos() {
    return this.client.cosmos;
  }

  get ikeplr() {
    return this.client.providers.keplr;
  }
  async enable(chainIds: string | string[]) {
    await this.ikeplr.enable(chainIds);
  }

  async suggestToken({ chainName, tokens, type }: WalletTypes.SuggestToken) {
    if (type === "cw20") {
      await this.cosmos.request({
        method: "cos_addTokensCW20",
        params: {
          chainName,
          tokens,
        },
      });
    }
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
    const key = (await this.cosmos.request({
      method: "cos_requestAccount",
      params: { chainName: chainId },
    })) as WalletTypes.RequestAccountResponse;
    return {
      username: key.name,
      address: key.address,
      pubkey: key.publicKey,
      algo: key.algo,
    };
  }

  async disconnect() {
    await this.cosmos.request({
      method: "cos_disconnect",
    });
  }

  on(type: string, listener: EventListenerOrEventListenerObject): void {
    const event = this.cosmos.on(type, listener);
    const typeEventMap: Map<EventListenerOrEventListenerObject, Event> =
      this.eventMap.get(type) || new Map();
    typeEventMap.set(listener, event);
    this.eventMap.set(type, typeEventMap);
  }

  off(type: string, listener: EventListenerOrEventListenerObject): void {
    const event = this.eventMap.get(type)?.get(listener);
    if (event) {
      this.cosmos.off(event);
    }
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
    // return this.ikeplr.getOfflineSignerAuto(chainId);
  }

  getOfflineSignerAmino(chainId: string) {
    return this.ikeplr.getOfflineSignerOnlyAmino(chainId);
  }

  getOfflineSignerDirect(chainId: string) {
    return this.ikeplr.getOfflineSigner(
      chainId
    ) as unknown as OfflineDirectSigner;
  }

  async addChain(chainInfo: WalletTypes.ChainRecord) {
    const suggestChain = chainRegistryChainToCosmostation(
      chainInfo.chain,
      chainInfo.assetList ? [chainInfo.assetList] : []
    );
    if (chainInfo.preferredEndpoints?.rest?.[0]) {
      (suggestChain.restURL as string | WalletTypes.ExtendedHttpEndpoint) =
        chainInfo.preferredEndpoints?.rest?.[0];
    }
    const result = (await this.cosmos.request({
      method: "cos_addChain",
      params: suggestChain,
    })) as boolean;

    if (!result) {
      throw new Error(`Failed to add chain ${chainInfo.name}.`);
    }
  }

  async signAmino(
    chainId: string,
    signer: string,
    signDoc: StdSignDoc,
    signOptions?: WalletTypes.SignOptions
  ) {
    if (this.ikeplr?.signAmino) {
      return await this.ikeplr.signAmino(
        chainId,
        signer,
        signDoc,
        signOptions || this.defaultSignOptions
      );
    }

    return await this.cosmos.request({
      method: "cos_signAmino",
      params: {
        chainName: chainId,
        doc: signDoc,
        isEditMemo: (signOptions || this.defaultSignOptions).preferNoSetMemo,
        isEditFee: (signOptions || this.defaultSignOptions).preferNoSetFee,
      },
    });
  }

  async signDirect(
    chainId: string,
    signer: string,
    signDoc: WalletTypes.DirectSignDoc,
    signOptions?: WalletTypes.SignOptions
  ) {
    if (this.ikeplr?.signDirect) {
      return await this.ikeplr.signDirect(
        chainId,
        signer,
        signDoc,
        signOptions || this.defaultSignOptions
      );
    }

    return await this.cosmos.request({
      method: "cos_signDirect",
      params: {
        chainName: chainId,
        doc: signDoc,
        isEditMemo: (signOptions || this.defaultSignOptions).preferNoSetMemo,
        isEditFee: (signOptions || this.defaultSignOptions).preferNoSetFee,
      },
    });
  }

  async signArbitrary(
    chainId: string,
    signer: string,
    data: string | Uint8Array
  ): Promise<StdSignature> {
    try {
      return await this.ikeplr.signArbitrary(chainId, signer, data);
    } catch (error) {
      // https://github.com/cosmostation/cosmostation-chrome-extension-client/blob/main/src/cosmos.ts#LL70C17-L70C28
      const message =
        typeof data === "string" ? data : new TextDecoder("utf-8").decode(data);
      return await this.cosmos.request({
        method: "cos_signMessage",
        params: {
          chainName: chainId,
          signer,
          message,
        },
      });
    }
  }

  async sendTx(
    chainId: string,
    tx: Uint8Array,
    mode: WalletTypes.BroadcastMode
  ) {
    return await this.ikeplr.sendTx(chainId, tx, mode);
  }
}

export const getCosmostationFromExtension: () => Promise<
  WalletTypes.CosmostationClient | undefined
> = async () => {
  if (typeof window === "undefined") {
    return void 0;
  }

  const cosmostation = (window as CosmostationWindow).cosmostation;

  if (cosmostation) {
    return cosmostation;
  }

  if (document.readyState === "complete") {
    if (cosmostation) {
      return cosmostation;
    } else {
      throw "Client not exists";
    }
  }

  return new Promise((resolve, reject) => {
    const documentStateChange = (event: Event) => {
      if (
        event.target &&
        (event.target as Document).readyState === "complete"
      ) {
        const cosmostation = (window as CosmostationWindow).cosmostation;
        if (cosmostation) {
          resolve(cosmostation);
        } else {
          reject("Client not exists");
        }
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
};
