import { MainnetConfig } from "@/utils/constants";
import { StargateClient } from "@cosmjs/stargate";

export const fetchUserBalance = async (address: string, denom: string) => {
  const client = await StargateClient.connect(MainnetConfig.rpc_endpoint);
  const balance = await client.getBalance(address, denom);
  return balance;
};
