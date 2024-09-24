export interface Token {
  name: string;
  icon: string;
  usdValue: number;
  balance: number;
  category: string;
  decimals: number;
  tokenAddress?: string;
  type?: string;
}
