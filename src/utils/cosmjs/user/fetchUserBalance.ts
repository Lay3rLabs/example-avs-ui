import { MainnetConfig } from "@/utils/constants";
import { StargateClient } from "@cosmjs/stargate";

/**
 * Fetches the balance of a specific denomination for a given user address on the blockchain.
 *
 * @param address - The user's blockchain address to fetch the balance for.
 * @param denom - The denomination to check the balance of (e.g., "uslay" for the SLAY token).
 * @returns A promise that resolves to a balance object containing the amount and denomination.
 *
 * @example
 * const balance = await fetchUserBalance("slay3r1address...", "uslay");
 * console.log(balance); // { amount: "1000000", denom: "uslay" }
 */
export const fetchUserBalance = async (address: string, denom: string) => {
  // Create a connection to the blockchain using the StargateClient with the specified RPC endpoint
  const client = await StargateClient.connect(MainnetConfig.rpc_endpoint);

  // Fetch the balance for the specified address and denomination
  const balance = await client.getBalance(address, denom);

  // Return the balance object containing the amount and denomination
  return balance;
};
