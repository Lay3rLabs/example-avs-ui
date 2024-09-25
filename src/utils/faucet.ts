import { faucetAddress } from "./constants";

/**
 * Calls the faucet API to credit the specified address with test tokens.
 *
 * @param userAddress - The user's address to which the faucet should send tokens.
 * @returns A promise that resolves to the response data from the faucet API.
 * @throws An error if the API request fails.
 */
export const callFaucet = async (userAddress: string) => {
  // Making a POST request to the faucet endpoint with the user's address and token denomination
  const response = await fetch(faucetAddress, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      denom: "uslay", // The microdenomination of the token to be credited
      address: userAddress, // The user's address that will receive the tokens
    }),
  });

  // Check if the response is not OK and throw an error with the status text
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  // Parse the response data as JSON and return it
  const data = await response.json();
  return data;
};
