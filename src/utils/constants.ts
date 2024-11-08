/**
 * Configuration for connecting to the Layer Hacknet.
 */
const _HacknetConfig = {
  /** The RPC endpoint for the Layer Hacknet. */
  rpc_endpoint: "https://rpc.hack.layer.xyz",

  /** The gRPC endpoint for the Layer Hacknet. */
  grpc_endpoint: "https://grpc.hack.layer.xyz:443",

  /** The LCD endpoint for the Layer Hacknet. */
  lcd_endpoint: "https://api.hack.layer.xyz",

  /** The chain ID for the Layer Hacknet. */
  chain_id: "layer-hack-1",

  /** The gas amount for transactions on the Layer Hacknet. */
  gas_amount: "0.025",

  /** The native denomination for the Layer token in micro units (e.g., 'ulayer'). */
  native_denom: "ulayer",
};

const LocalDevnetConfig = {
  /** The RPC endpoint for the Layer local devnet. */
  rpc_endpoint: "http://localhost:26657",

  /** The gRPC endpoint for the Layer local devnet. */
  grpc_endpoint: "http://localhost:9090",

  /** The LCD endpoint for the Layer local devnet. */
  lcd_endpoint: "http://localhost:1317",

  /** The chain ID for the Layer local devnet. */
  chain_id: "slay3r-local",

  /** The gas amount for transactions on the Layer local devnet. */
  gas_amount: "0.025",

  /** The native denomination for the Layer token in micro units. */
  native_denom: "uslay",
};

export const HacknetConfig =
  process.env.ENV == "LOCAL" ? LocalDevnetConfig : _HacknetConfig;

/**
 * The URL for the faucet service, used to request tokens for the Layer Hacknet.
 */
export const faucetAddress = "https://faucet.hack.layer.xyz/credit";

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
 * Chain registry entry for the Layer Hacknet.
 * This configuration can be used to register the Layer chain in wallets and other applications.
 */
const chainRegistryEntryHacknet = {
  /** The unique identifier for the Layer chain. */
  chainId: "layer-hack-1",

  /** The human-readable name of the Layer chain. */
  chainName: "Layer Hacknet",

  /** The RPC endpoint for interacting with the Layer chain. */
  rpc: "https://rpc.hack.layer.xyz",

  /** The gRPC endpoint for interacting with the Layer chain. */
  grpc: "https://grpc.hack.layer.xyz:443",

  /** The REST endpoint for interacting with the Layer chain. */
  rest: "https://api.hack.layer.xyz",

  /** BIP44 coin type for the Layer chain. This is used for generating wallet addresses. */
  bip44: {
    coinType: 118,
  },

  /** Bech32 configuration for Layer address prefixes. */
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

  /** The list of supported currencies on the Layer chain. */
  currencies: [
    {
      /** The display denomination of the Layer token (e.g., 'LAYER'). */
      coinDenom: "LAYER",

      /** The minimal denomination of the Layer token in micro units (e.g., 'ulayer'). */
      coinMinimalDenom: "ulayer",

      /** The number of decimal places the token supports. */
      coinDecimals: 6,

      /** The CoinGecko ID for the Layer token, used for price data. */
      coinGeckoId: "Layer",
    },
  ],

  /** The list of currencies that can be used to pay transaction fees on the Layer chain. */
  feeCurrencies: [
    {
      /** The display denomination of the Layer token (e.g., 'LAYER'). */
      coinDenom: "LAYER",

      /** The minimal denomination of the Layer token in micro units (e.g., 'ulayer'). */
      coinMinimalDenom: "ulayer",

      /** The number of decimal places the token supports. */
      coinDecimals: 6,

      /** The CoinGecko ID for the Layer token, used for price data. */
      coinGeckoId: "Layer",

      /** Recommended gas price settings for transaction fees. */
      gasPriceStep: {
        /** The low gas price in ulayer. */
        low: 0.015,

        /** The average gas price in ulayer. */
        average: 0.025,

        /** The high gas price in ulayer. */
        high: 0.035,
      },
    },
  ],

  /** The staking currency for the Layer chain. */
  stakeCurrency: {
    /** The display denomination of the Layer token used for staking (e.g., 'LAYER'). */
    coinDenom: "LAYER",

    /** The minimal denomination of the staking token in micro units (e.g., 'ulayer'). */
    coinMinimalDenom: "ulayer",

    /** The number of decimal places the staking token supports. */
    coinDecimals: 6,

    /** The CoinGecko ID for the staking token, used for price data. */
    coinGeckoId: "Layer",
  },
};

/**
 * Chain registry entry for the Layer localnet.
 * This configuration can be used to register the Layer chain in wallets and other applications.
 */
const chainRegistryEntryLocalnet = {
  /** The unique identifier for the Layer chain. */
  chainId: "slay3r-local",

  /** The human-readable name of the Layer chain. */
  chainName: "Layer Localnet",

  /** The RPC endpoint for interacting with the Layer chain. */
  rpc: "http://localhost:26657",

  /** The gRPC endpoint for interacting with the Layer chain. */
  grpc: "http://localhost:9090",

  /** The REST endpoint for interacting with the Layer chain. */
  rest: "http://localhost:1317",

  /** BIP44 coin type for the Layer chain. This is used for generating wallet addresses. */
  bip44: {
    coinType: 118,
  },

  /** Bech32 configuration for Layer address prefixes. */
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

  /** The list of supported currencies on the Layer localnet chain. */
  currencies: [
    {
      /** The display denomination of the Layer localnet token (e.g., 'SLAY'). */
      coinDenom: "SLAY",

      /** The minimal denomination of the Layer localnet token in micro units (e.g., 'uslay'). */
      coinMinimalDenom: "uslay",

      /** The number of decimal places the token supports. */
      coinDecimals: 6,

      /** The CoinGecko ID for the Layer localnet token, used for price data. */
      coinGeckoId: "slay3r",
    },
  ],

  /** The list of currencies that can be used to pay transaction fees on the Layer localnet chain. */
  feeCurrencies: [
    {
      /** The display denomination of the Layer localnet token (e.g., 'SLAY'). */
      coinDenom: "SLAY",

      /** The minimal denomination of the Layer localnet token in micro units (e.g., 'uslay'). */
      coinMinimalDenom: "uslay",

      /** The number of decimal places the token supports. */
      coinDecimals: 6,

      /** The CoinGecko ID for the Layer localnet token, used for price data. */
      coinGeckoId: "slay3r",

      /** Recommended gas price settings for transaction fees. */
      gasPriceStep: {
        /** The low gas price in uslay. */
        low: 0.005,

        /** The average gas price in uslay. */
        average: 0.008,

        /** The high gas price in uslay. */
        high: 0.01,
      },
    },
  ],

  /** The staking currency for the Layer localnet chain. */
  stakeCurrency: {
    /** The display denomination of the Layer localnet token used for staking (e.g., 'SLAY'). */
    coinDenom: "SLAY",

    /** The minimal denomination of the staking token in micro units (e.g., 'uslay'). */
    coinMinimalDenom: "uslay",

    /** The number of decimal places the staking token supports. */
    coinDecimals: 6,

    /** The CoinGecko ID for the staking token, used for price data. */
    coinGeckoId: "slay3r",
  },
};

export const chainRegistryEntry =
  process.env.ENV == "LOCAL"
    ? chainRegistryEntryLocalnet
    : chainRegistryEntryHacknet;
