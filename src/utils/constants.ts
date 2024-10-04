/**
 * Configuration for connecting to the Layer testnet.
 */
export const TestnetConfig = {
  /** The RPC endpoint for the Layer testnet. */
  rpc_endpoint: "https://rpc.layer-p.net",

  /** The gRPC endpoint for the Layer testnet. */
  grpc_endpoint: "https://grpc.layer-p.net:443",

  /** The LCD endpoint for the Layer testnet. */
  lcd_endpoint: "https://api.layer-p.net",

  /** The chain ID for the Layer testnet. */
  chain_id: "layer-permissionless-3",

  /** The gas amount for transactions on the Layer testnet. */
  gas_amount: "0.025",

  /** The native denomination for the Layer token in micro units (e.g., 'uperm'). */
  native_denom: "uperm",
};

/**
 * The URL for the faucet service, used to request test tokens for the Layer testnet.
 */
export const faucetAddress = "https://faucet.layer-p.net/credit";

export const taskQueueAddress =
  "layer1nmv2maum4qqz85trqt9dhh7wgzwdvhuy9zkgtwkhstq392xnhm9s7j9h38";

/**
 * The title is used for navigation
 */
export const taskQueueAddresses: { title: string; address: string }[] = [
  {
    title: "Square Task",
    address: "layer1nmv2maum4qqz85trqt9dhh7wgzwdvhuy9zkgtwkhstq392xnhm9s7j9h38",
  },
];

/**
 * Chain registry entry for the Layer testnet.
 * This configuration can be used to register the Layer chain in wallets and other applications.
 */
export const chainRegistryEntry = {
  /** The unique identifier for the Layer chain. */
  chainId: "layer-permissionless-3",

  /** The human-readable name of the Layer chain. */
  chainName: "Layer-P Testnet",

  /** The RPC endpoint for interacting with the Layer chain. */
  rpc: "https://rpc.layer-p.net",

  /** The gRPC endpoint for interacting with the Layer chain. */
  grpc: "https://grpc.layer-p.net:443",

  /** The REST endpoint for interacting with the Layer chain. */
  rest: "https://api.layer-p.net",

  /** BIP44 coin type for the Layer chain. This is used for generating wallet addresses. */
  bip44: {
    coinType: 118,
  },

  /** Bech32 configuration for Layer-P address prefixes. */
  bech32Config: {
    /** Prefix for account addresses (e.g., 'layer1...'). */
    bech32PrefixAccAddr: "layer",
    /** Prefix for account public keys. */
    bech32PrefixAccPub: "layerpub",
    /** Prefix for validator operator addresses. */
    bech32PrefixValAddr: "layervaloper",
    /** Prefix for validator operator public keys. */
    bech32PrefixValPub: "layervaloperpub",
    /** Prefix for consensus node addresses. */
    bech32PrefixConsAddr: "layervalcons",
    /** Prefix for consensus node public keys. */
    bech32PrefixConsPub: "layervalconspub",
  },

  /** The list of supported currencies on the Layer-P chain. */
  currencies: [
    {
      /** The display denomination of the Layer-P token (e.g., 'Perm'). */
      coinDenom: "Perm",

      /** The minimal denomination of the Layer-P token in micro units (e.g., 'uperm'). */
      coinMinimalDenom: "uperm",

      /** The number of decimal places the token supports. */
      coinDecimals: 6,

      /** The CoinGecko ID for the Layer-P token, used for price data. */
      coinGeckoId: "layer-p",
    },
  ],

  /** The list of currencies that can be used to pay transaction fees on the Layer-P chain. */
  feeCurrencies: [
    {
      /** The display denomination of the Layer-P token (e.g., 'Perm'). */
      coinDenom: "Perm",

      /** The minimal denomination of the Layer-P token in micro units (e.g., 'uperm'). */
      coinMinimalDenom: "uperm",

      /** The number of decimal places the token supports. */
      coinDecimals: 6,

      /** The CoinGecko ID for the Layer-P token, used for price data. */
      coinGeckoId: "layer-p",

      /** Recommended gas price settings for transaction fees. */
      gasPriceStep: {
        /** The low gas price in uperm. */
        low: 0.015,

        /** The average gas price in uperm. */
        average: 0.025,

        /** The high gas price in uperm. */
        high: 0.035,
      },
    },
  ],

  /** The staking currency for the Layer-P chain. */
  stakeCurrency: {
    /** The display denomination of the Layer-P token used for staking (e.g., 'Perm'). */
    coinDenom: "Perm",

    /** The minimal denomination of the staking token in micro units (e.g., 'uperm'). */
    coinMinimalDenom: "uperm",

    /** The number of decimal places the staking token supports. */
    coinDecimals: 6,

    /** The CoinGecko ID for the staking token, used for price data. */
    coinGeckoId: "layer-p",
  },
};
