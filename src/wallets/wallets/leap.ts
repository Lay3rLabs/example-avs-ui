import { Algo, OfflineDirectSigner } from "@cosmjs/proto-signing";
import { chainRegistryChainToKeplr } from "@chain-registry/keplr";
import { StdSignature, StdSignDoc } from "@cosmjs/amino";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import {
  BroadcastMode,
  ChainRecord,
  DirectSignDoc,
  ExtendedHttpEndpoint,
  LeapClient,
  SignOptions,
  SignType,
  SuggestToken,
  Wallet,
} from "@/types";
import { HacknetConfig } from "@/utils";
import { GasPrice, SigningStargateClient } from "@cosmjs/stargate";

/**
 * Leap class provides methods for interacting with the Leap wallet.
 */
export class Leap implements Wallet {
  readonly client: LeapClient;
  private _defaultSignOptions: SignOptions = {
    preferNoSetFee: false,
    preferNoSetMemo: true,
    disableBalanceCheck: true,
  };

  /**
   * Gets the default sign options for transactions.
   */
  get defaultSignOptions() {
    return this._defaultSignOptions;
  }

  /**
   * Sets the default sign options for transactions.
   *
   * @param options - The sign options to set as default.
   */
  setDefaultSignOptions(options: SignOptions) {
    this._defaultSignOptions = options;
  }

  /**
   * Creates a new instance of the Leap class.
   *
   * @param client - The Leap client object.
   */
  constructor(client: LeapClient) {
    this.client = client;
  }

  /**
   * Enables the specified chain(s) in the Leap wallet.
   *
   * @param chainIds - The chain ID(s) to enable.
   */
  async enable(chainIds: string | string[]) {
    await this.client.enable(chainIds);
  }

  /**
   * Suggests adding a CW20 token to the Leap wallet.
   *
   * @param params - Object containing chainId, tokens, and type of token to suggest.
   */
  async suggestToken({ chainId, tokens, type }: SuggestToken) {
    if (type === "cw20") {
      for (const { contractAddress } of tokens) {
        await this.client.suggestToken(chainId, contractAddress);
      }
    }
  }

  /**
   * Adds a new chain to the Leap wallet.
   *
   * @param chainInfo - The ChainRecord containing information about the chain to add.
   */
  async addChain(chainInfo: ChainRecord) {
    const suggestChain = chainRegistryChainToKeplr(
      chainInfo.chain,
      chainInfo.assetList ? [chainInfo.assetList] : []
    );

    if (chainInfo.preferredEndpoints?.rest?.[0]) {
      (suggestChain.rest as string | ExtendedHttpEndpoint) =
        chainInfo.preferredEndpoints?.rest?.[0];
    }

    if (chainInfo.preferredEndpoints?.rpc?.[0]) {
      (suggestChain.rpc as string | ExtendedHttpEndpoint) =
        chainInfo.preferredEndpoints?.rpc?.[0];
    }

    await this.client.experimentalSuggestChain(suggestChain);
  }

  /**
   * Disconnects the Leap wallet.
   */
  async disconnect() {
    await this.client.disconnect();
  }

  /**
   * Retrieves a simple account object containing the namespace, chainId, address, and username.
   *
   * @param chainId - The chain ID to get the account information from.
   * @returns A promise that resolves to a simple account object.
   */
  async getSimpleAccount(chainId: string) {
    const { address, username } = await this.getAccount(chainId);
    return {
      namespace: "cosmos",
      chainId,
      address,
      username,
    };
  }

  /**
   * Retrieves detailed account information from the Leap wallet.
   *
   * @param chainId - The chain ID to get the account information from.
   * @returns A promise that resolves to an object containing username, address, algo, and pubkey.
   */
  async getAccount(chainId: string) {
    const key = await this.client.getKey(chainId);
    return {
      username: key.name,
      address: key.bech32Address,
      algo: key.algo as Algo,
      pubkey: key.pubKey,
    };
  }

  /**
   * Gets an offline signer for the specified chain and signing type.
   *
   * @param chainId - The chain ID for which to get the offline signer.
   * @param preferredSignType - The preferred sign type ('amino' or 'direct').
   * @returns An offline signer for the specified chain.
   */
  getOfflineSigner(chainId: string, preferredSignType?: SignType) {
    switch (preferredSignType) {
      case "amino":
        return this.getOfflineSignerAmino(chainId);
      case "direct":
        return this.getOfflineSignerDirect(chainId);
      default:
        return this.getOfflineSignerAmino(chainId);
    }
  }

  /**
   * Gets an amino offline signer for the specified chain.
   *
   * @param chainId - The chain ID for which to get the offline amino signer.
   * @returns An OfflineAminoSigner object.
   */
  getOfflineSignerAmino(chainId: string) {
    return this.client.getOfflineSignerOnlyAmino(chainId);
  }

  /**
   * Gets a direct offline signer for the specified chain.
   *
   * @param chainId - The chain ID for which to get the offline direct signer.
   * @returns An OfflineDirectSigner object.
   */
  getOfflineSignerDirect(chainId: string) {
    return this.client.getOfflineSigner(chainId) as OfflineDirectSigner;
  }

  /**
   * Gets a signing client for CosmWasm transactions.
   *
   * @returns A promise that resolves to a SigningCosmWasmClient instance.
   */
  async getSigningCosmWasmClient(): Promise<SigningCosmWasmClient> {
    return SigningCosmWasmClient.connectWithSigner(
      HacknetConfig.rpc_endpoint,
      this.getOfflineSigner(HacknetConfig.chain_id),
      {
        gasPrice: GasPrice.fromString("0.025ulayer"),
      }
    );
  }

  /**
   * Gets a signing client for Stargate transactions.
   *
   * @returns A promise that resolves to a SigningStargateClient instance.
   */
  async getSigningStargateClient(): Promise<SigningStargateClient> {
    return SigningStargateClient.connectWithSigner(
      HacknetConfig.rpc_endpoint,
      this.getOfflineSigner(HacknetConfig.chain_id),
      {
        gasPrice: GasPrice.fromString("0.025ulayer"),
      }
    );
  }

  /**
   * Signs a transaction using the amino signing method.
   *
   * @param chainId - The chain ID for which to sign the transaction.
   * @param signer - The signer address.
   * @param signDoc - The document to be signed.
   * @param signOptions - Optional sign options to use.
   * @returns A promise that resolves to the signed transaction.
   */
  async signAmino(
    chainId: string,
    signer: string,
    signDoc: StdSignDoc,
    signOptions?: SignOptions
  ) {
    return await this.client.signAmino(
      chainId,
      signer,
      signDoc,
      signOptions || this.defaultSignOptions
    );
  }

  /**
   * Signs arbitrary data using the Leap wallet.
   *
   * @param chainId - The chain ID for which to sign the data.
   * @param signer - The signer address.
   * @param data - The data to be signed.
   * @returns A promise that resolves to the signed data.
   */
  async signArbitrary(
    chainId: string,
    signer: string,
    data: string | Uint8Array
  ): Promise<StdSignature> {
    return await this.client.signArbitrary(chainId, signer, data);
  }

  /**
   * Signs a transaction using the direct signing method.
   *
   * @param chainId - The chain ID for which to sign the transaction.
   * @param signer - The signer address.
   * @param signDoc - The document to be signed.
   * @param signOptions - Optional sign options to use.
   * @returns A promise that resolves to the signed transaction.
   */
  async signDirect(
    chainId: string,
    signer: string,
    signDoc: DirectSignDoc,
    signOptions?: SignOptions
  ) {
    return await this.client.signDirect(
      chainId,
      signer,
      signDoc,
      signOptions || this.defaultSignOptions
    );
  }

  /**
   * Sends a transaction to the blockchain.
   *
   * @param chainId - The chain ID to which the transaction will be sent.
   * @param tx - The transaction bytes.
   * @param mode - The broadcast mode.
   * @returns A promise that resolves to the result of the transaction broadcast.
   */
  async sendTx(chainId: string, tx: Uint8Array, mode: BroadcastMode) {
    return await this.client.sendTx(chainId, tx, mode);
  }
}

/**
 * Interface representing the Leap window object with the Leap client.
 */
interface LeapWindow {
  leap?: LeapClient;
}

/**
 * Retrieves the Leap instance from the browser extension.
 *
 * @returns A promise that resolves to the Leap client or undefined if not installed.
 * @throws An error if the Leap client is not installed.
 */
export const getLeapFromExtension: () => Promise<
  LeapClient | undefined
> = async () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const leap = (window as LeapWindow).leap;

  if (leap) {
    return leap;
  }

  if (document.readyState === "complete") {
    if (leap) {
      return leap;
    } else {
      throw new Error("ClientNotExistError");
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
          reject(new Error("ClientNotExistError"));
        }
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
};
