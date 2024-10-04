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
      denom: "uperm", // The microdenomination of the token to be credited
      address: userAddress, // The user's address that will receive the tokens
    }),
  });

  // Check if the response is not OK and throw an error with the status text
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  // Check the content type of the response
  const contentType = response.headers.get("Content-Type");

  // If response is JSON, parse it as JSON
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    return data;
  } else {
    // Otherwise, parse the response as text
    const data = await response.text();
    return data; // In this case, it will return "ok"
  }
};
