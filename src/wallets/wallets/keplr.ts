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
import {
  ChainRecord,
  DirectSignDoc,
  ExtendedHttpEndpoint,
  SignOptions,
  SignType,
  SuggestToken,
  Wallet,
} from "@/types";
import { TestnetConfig } from "@/utils";

/**
 * Keplr class provides methods for interacting with the Keplr wallet.
 */
export class Keplr implements Wallet {
  readonly client: K;
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
   * Creates a new instance of the Keplr class.
   *
   * @param client - The Keplr client object.
   */
  constructor(client: K) {
    this.client = client;
  }

  /**
   * Enables the specified chain(s) in the Keplr wallet.
   *
   * @param chainIds - The chain ID(s) to enable.
   */
  async enable(chainIds: string | string[]) {
    await this.client.enable(chainIds);
  }

  /**
   * Gets a signing client for CosmWasm transactions.
   *
   * @returns A promise that resolves to a SigningCosmWasmClient instance.
   */
  async getSigningCosmWasmClient(): Promise<SigningCosmWasmClient> {
    return SigningCosmWasmClient.connectWithSigner(
      TestnetConfig.rpc_endpoint,
      this.getOfflineSigner(TestnetConfig.chain_id),
      {
        gasPrice: GasPrice.fromString("0.025uperm"),
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
      TestnetConfig.rpc_endpoint,
      this.getOfflineSigner(TestnetConfig.chain_id),
      {
        gasPrice: GasPrice.fromString("0.025uperm"),
      }
    );
  }

  /**
   * Suggests adding a CW20 token to the Keplr wallet.
   *
   * @param params - Object containing chainId, tokens, and type of token to suggest.
   */
  async suggestToken({ chainId, tokens, type }: SuggestToken) {
    if (type === "cw20") {
      for (const { contractAddress, viewingKey } of tokens) {
        await this.client.suggestToken(chainId, contractAddress, viewingKey);
      }
    }
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
   * Retrieves detailed account information from the Keplr wallet.
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
  }

  /**
   * Gets a direct offline signer for the specified chain.
   *
   * @param chainId - The chain ID for which to get the offline direct signer.
   * @returns An OfflineDirectSigner object.
   */
  getOfflineSignerDirect(chainId: string): OfflineDirectSigner {
    return {
      getAccounts: async () => {
        return [await this.getAccount(chainId)];
      },
      // @ts-expect-error TODO
      signDirect: async (signerAddress, signDoc) => {
        return this.signDirect(
          chainId,
          signerAddress,
          // @ts-expect-error TODO
          signDoc,
          this.defaultSignOptions
        );
      },
    };
  }

  /**
   * Adds a new chain to the Keplr wallet.
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
   * Signs arbitrary data using the Keplr wallet.
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
  // @ts-expect-error TODO
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
 * Retrieves the Keplr instance from the browser extension.
 *
 * @returns A promise that resolves to the Keplr client or undefined if not installed.
 * @throws An error if Keplr is not installed.
 */
export const getKeplrFromExtension: () => Promise<K | undefined> = async () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const keplr = (window as KeplrWindow).keplr;

  if (keplr) {
    return keplr;
  }

  if (document.readyState === "complete") {
    if (keplr) {
      return keplr;
    } else {
      throw new Error("Keplr not installed");
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
          reject(new Error("Keplr not installed"));
        }
        document.removeEventListener("readystatechange", documentStateChange);
      }
    };

    document.addEventListener("readystatechange", documentStateChange);
  });
};
