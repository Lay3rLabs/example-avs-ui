export const MainnetConfig = {
  rpc_endpoint: "https://rpc.dev-cav3.net",
  lcd_endpoint: "https://lcd.dev-cav3.net",
  chain_id: "slay3r-dev",
  native_denom: "uslay",
};

export const chainRegistryEntry = {
  chainId: "slay3r-dev",
  chainName: "Slay3r",
  rpc: "https://rpc.dev-cav3.net",
  rest: "https://lcd.dev-cav3.net",
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: "slay3r",
    bech32PrefixAccPub: "slay3rpub",
    bech32PrefixValAddr: "slay3rvaloper",
    bech32PrefixValPub: "slay3rvaloperpub",
    bech32PrefixConsAddr: "slay3rvalcons",
    bech32PrefixConsPub: "slay3rvalconspub",
  },
  currencies: [
    {
      coinDenom: "Slay",
      coinMinimalDenom: "uslay",
      coinDecimals: 6,
      coinGeckoId: "slay3r",
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "Slay",
      coinMinimalDenom: "uslay",
      coinDecimals: 6,
      coinGeckoId: "slay3r",
      gasPriceStep: {
        low: 0.075,
        average: 0.1,
        high: 0.125,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: "Slay",
    coinMinimalDenom: "uslay",
    coinDecimals: 6,
    coinGeckoId: "slay3r",
  },
};
