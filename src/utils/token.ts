/**
 * Converts a microdenomination (e.g., 'uperm') to its standard denomination (e.g., 'slay').
 *
 * @param microDenom - The microdenomination string (e.g., 'uperm').
 * @returns The standard denomination string (e.g., 'slay').
 */
export function microDenomToDenom(microDenom: string): string {
  return microDenom.startsWith("u") ? microDenom.slice(1) : microDenom;
}

/**
 * Converts a standard denomination (e.g., 'slay') to its microdenomination (e.g., 'uperm').
 *
 * @param denom - The standard denomination string (e.g., 'slay').
 * @returns The microdenomination string (e.g., 'uperm').
 */
export function denomToMicroDenom(denom: string): string {
  return denom.startsWith("u") ? denom : `u${denom}`;
}

/**
 * Converts an amount from micro units to standard units.
 *
 * @param microAmount - The amount in micro units (e.g., 1000000 for 1 SLAY).
 * @param decimals - The number of decimal places the standard denomination has (e.g., 6 for SLAY).
 * @returns The amount in standard units as a string (e.g., '1' for 1000000 uperm).
 */
export function microAmountToAmount(
  microAmount: number | string,
  decimals: number = 6
): string {
  return (Number(microAmount) / Math.pow(10, decimals)).toFixed(decimals);
}

/**
 * Converts an amount from standard units to micro units.
 *
 * @param amount - The amount in standard units (e.g., 1 for 1 SLAY).
 * @param decimals - The number of decimal places the standard denomination has (e.g., 6 for SLAY).
 * @returns The amount in micro units as a string (e.g., '1000000' for 1 SLAY).
 */
export function amountToMicroAmount(
  amount: number | string,
  decimals: number = 6
): string {
  return (Number(amount) * Math.pow(10, decimals)).toFixed(0);
}

/**
 * Formats a balance object returned from cosmjs to a readable string.
 *
 * @param balance - The balance object returned from cosmjs with amount and denom properties.
 * @param decimals - The number of decimal places the standard denomination has (e.g., 6 for SLAY).
 * @returns A formatted string with the amount and denomination (e.g., '1 SLAY').
 */
export function formatBalance(
  balance: { amount: string; denom: string },
  decimals: number = 6
): string {
  const standardDenom = microDenomToDenom(balance.denom);
  const amount = microAmountToAmount(balance.amount, decimals);
  return `${amount} ${standardDenom.toUpperCase()}`;
}

/**
 * Converts a balance string to an object with amount and denomination properties.
 *
 * @param balanceStr - The balance string in the format "amount denom" (e.g., '1 SLAY').
 * @returns An object with amount and denom properties.
 */
export function parseBalance(balanceStr: string): {
  amount: string;
  denom: string;
} {
  const [amount, denom] = balanceStr.split(" ");
  return {
    amount: amountToMicroAmount(amount),
    denom: denomToMicroDenom(denom.toLowerCase()),
  };
}
