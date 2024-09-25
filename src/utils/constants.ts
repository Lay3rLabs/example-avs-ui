/**
 * Configuration for connecting to the Slay3r mainnet.
 */
export const MainnetConfig = {
  /** The RPC endpoint for the Slay3r mainnet. */
  rpc_endpoint: "https://rpc.dev-cav3.net",

  /** The LCD endpoint for the Slay3r mainnet. */
  lcd_endpoint: "https://lcd.dev-cav3.net",

  /** The chain ID for the Slay3r mainnet. */
  chain_id: "slay3r-dev",

  /** The native denomination for the Slay3r token in micro units (e.g., 'uslay'). */
  native_denom: "uslay",
};

/**
 * The URL for the faucet service, used to request test tokens for the Slay3r network.
 */
export const faucetAddress = "https://faucet.dev-cav3.net/credit";

/**
 * Chain registry entry for the Slay3r network.
 * This configuration can be used to register the Slay3r chain in wallets and other applications.
 */
export const chainRegistryEntry = {
  /** The unique identifier for the Slay3r chain. */
  chainId: "slay3r-dev",

  /** The human-readable name of the Slay3r chain. */
  chainName: "Slay3r",

  /** The RPC endpoint for interacting with the Slay3r chain. */
  rpc: "https://rpc.dev-cav3.net",

  /** The REST endpoint for interacting with the Slay3r chain. */
  rest: "https://lcd.dev-cav3.net",

  /** BIP44 coin type for the Slay3r chain. This is used for generating wallet addresses. */
  bip44: {
    coinType: 118,
  },

  /** Bech32 configuration for Slay3r address prefixes. */
  bech32Config: {
    /** Prefix for account addresses (e.g., 'slay3r1...'). */
    bech32PrefixAccAddr: "slay3r",
    /** Prefix for account public keys. */
    bech32PrefixAccPub: "slay3rpub",
    /** Prefix for validator operator addresses. */
    bech32PrefixValAddr: "slay3rvaloper",
    /** Prefix for validator operator public keys. */
    bech32PrefixValPub: "slay3rvaloperpub",
    /** Prefix for consensus node addresses. */
    bech32PrefixConsAddr: "slay3rvalcons",
    /** Prefix for consensus node public keys. */
    bech32PrefixConsPub: "slay3rvalconspub",
  },

  /** The list of supported currencies on the Slay3r chain. */
  currencies: [
    {
      /** The display denomination of the Slay3r token (e.g., 'Slay'). */
      coinDenom: "Slay",

      /** The minimal denomination of the Slay3r token in micro units (e.g., 'uslay'). */
      coinMinimalDenom: "uslay",

      /** The number of decimal places the token supports. */
      coinDecimals: 6,

      /** The CoinGecko ID for the Slay3r token, used for price data. */
      coinGeckoId: "slay3r",
    },
  ],

  /** The list of currencies that can be used to pay transaction fees on the Slay3r chain. */
  feeCurrencies: [
    {
      /** The display denomination of the Slay3r token (e.g., 'Slay'). */
      coinDenom: "Slay",

      /** The minimal denomination of the Slay3r token in micro units (e.g., 'uslay'). */
      coinMinimalDenom: "uslay",

      /** The number of decimal places the token supports. */
      coinDecimals: 6,

      /** The CoinGecko ID for the Slay3r token, used for price data. */
      coinGeckoId: "slay3r",

      /** Recommended gas price settings for transaction fees. */
      gasPriceStep: {
        /** The low gas price in uslay. */
        low: 0.075,

        /** The average gas price in uslay. */
        average: 0.1,

        /** The high gas price in uslay. */
        high: 0.125,
      },
    },
  ],

  /** The staking currency for the Slay3r chain. */
  stakeCurrency: {
    /** The display denomination of the Slay3r token used for staking (e.g., 'Slay'). */
    coinDenom: "Slay",

    /** The minimal denomination of the staking token in micro units (e.g., 'uslay'). */
    coinMinimalDenom: "uslay",

    /** The number of decimal places the staking token supports. */
    coinDecimals: 6,

    /** The CoinGecko ID for the staking token, used for price data. */
    coinGeckoId: "slay3r",
  },
};
