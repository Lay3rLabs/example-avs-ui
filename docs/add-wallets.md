#### Adding Support for a New Wallet

To add a new wallet to the project, follow these steps:

1. **Update the `WalletTypes` Enum**:
   - Open the `types.ts` file.
   - Add the new wallet type to the `WalletTypes` enum. This enum is used to identify different wallets.
   ```typescript
   export enum WalletTypes {
     Keplr = "Keplr",
     Leap = "Leap",
     MyNewWallet = "MyNewWallet", // Add your new wallet type here
   }
   ```

2. **Create a New Wallet Class**:
   - Create a new class for your wallet that implements the `Wallet` interface. This class should contain the necessary methods to interact with the wallet, such as connecting, signing transactions, and getting account information.
   - Example:
   ```typescript
   import { Wallet } from "@/types";
   import { MyNewWalletClient } from "my-new-wallet-sdk";

   export class MyNewWallet implements Wallet {
     readonly client: MyNewWalletClient;

     constructor(client: MyNewWalletClient) {
       this.client = client;
     }

     // Implement other methods like enable, getAccount, sign, etc.
   }
   ```

3. **Create a Function to Retrieve the Wallet Client**:
   - Create a function similar to `getKeplrFromExtension` or `getLeapFromExtension` to retrieve the wallet client from the browser extension or other sources.
   - Example:
   ```typescript
   import { MyNewWalletClient } from "my-new-wallet-sdk";

   export const getMyNewWalletFromExtension = async (): Promise<MyNewWalletClient | undefined> => {
     if (typeof window === "undefined") {
       return undefined;
     }

     const myNewWallet = (window as any).myNewWallet; // Replace with the appropriate window object

     if (myNewWallet) {
       return myNewWallet;
     }

     throw new Error("MyNewWallet not installed");
   };
   ```

4. **Update the `getWalletClient` Function**:
   - Open the `getWalletClient.ts` file and add a new case for the new wallet type in the switch statement.
   - Example:
   ```typescript
   import { MyNewWallet, getMyNewWalletFromExtension } from "./wallets";

   export async function getWalletClient(walletId: WalletTypes) {
     switch (walletId) {
       case WalletTypes.Leap:
         const LeapClient = await getLeapFromExtension();
         if (!LeapClient) throw new Error("No Leap client found");
         return new Leap(LeapClient);

       case WalletTypes.Keplr:
         const KeplrClient = await getKeplrFromExtension();
         if (!KeplrClient) throw new Error("No Keplr client found");
         return new Keplr(KeplrClient);

       case WalletTypes.MyNewWallet: // Add a new case for your wallet
         const MyNewWalletClient = await getMyNewWalletFromExtension();
         if (!MyNewWalletClient) throw new Error("No MyNewWallet client found");
         return new MyNewWallet(MyNewWalletClient);

       default:
         throw new Error("Unsupported wallet type");
     }
   }
   ```

5. **Test the Integration**:
   - Test the integration by selecting the new wallet type in your application and verifying that it can successfully connect, sign transactions, and retrieve account information.

By following these steps, you can add support for a new wallet to the project, making it available for users to connect and interact with the blockchain.