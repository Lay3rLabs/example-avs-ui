import { WalletTypes } from "@/types";
import { getWalletClient } from "./walletClient";
import { assets, chains } from "chain-registry";
import { SigningStargateClient, GasPrice } from "@cosmjs/stargate";

const findChainAsset = (chainName: string) => {
  const chain = chains.find((c) => c.chain_name === chainName)!;
  const assetList = assets.find((asset) => asset.chain_name === chainName)!;
  return { chain, assetList };
};

const getConfig = (assetName: string) => {
  const nameDiffs: { [key: string]: string } = {
    cosmos: "cosmoshub",
  };

  const chainAssetName = nameDiffs.hasOwnProperty(assetName)
    ? nameDiffs[assetName]
    : assetName;
  const { chain } = findChainAsset(chainAssetName);
  const feeToken = chain.fees?.fee_tokens[0];

  const gasPrice = GasPrice.fromString(
    String(feeToken?.average_gas_price) + feeToken?.denom
  );

  const assetListAssetName = assetName;
  const rpc =
    assetListAssetName === "cosmos"
      ? "https://rpc.cosmos.directory:443/cosmoshub"
      : "";

  return { ...chain, gasPrice, rpc_endpoint: rpc };
};

const connectWallet = async (walletClient: any, envConfig: any) => {
  await walletClient.enable(envConfig.chain_id);
  const signingStargateClient = await walletClient.getSigningStargateClient(
    envConfig
  );

  return signingStargateClient;
};

const getAccount = async (walletClient: any, envConfig: any) => {
  const account = await walletClient.getAccount(envConfig.chain_id);
  return account;
};

export async function getCustomClient(
  walletId: WalletTypes,
  assetName: string
): Promise<
  | {
      client: SigningStargateClient;
      account: any;
      envConfig: any;
    }
  | undefined
> {
  const envConfig = getConfig(assetName);
  const walletClient = await getWalletClient(walletId);

  const client = await connectWallet(walletClient, envConfig);

  const account = await getAccount(walletClient, envConfig);

  return {
    client,
    account,
    envConfig,
  };
}
