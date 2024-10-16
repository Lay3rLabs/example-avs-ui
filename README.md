# Example AVS UI

This repository contains a simple, opinionated setup for a Next.js application using TypeScript and Tailwind CSS. It is designed to compile to a Single Page Application (SPA) that can be hosted on a static CDN, making it ideal for small example apps aimed at external developers. The project setup prioritizes simplicity, ease of understanding, and quick customization.

It provides a sample UI for your AVS project on Layer, written in React. This is designed to be a quick start for building demos, with a well-structured and scalable codebase and clearly defined responsibilities for each package.

## Project Structure

```
.
├── public                      # Static assets served by the app (e.g., images, favicon)
├── src
│   ├── app                     # App Router directory (Next.js 13+)
│   │   ├── layout.tsx          # Main layout for all pages
│   │   ├── page.tsx            # Default root page (index)
│   │   ├── about               # Example of a nested route (about page)
│   │   │   └── page.tsx        # About page component
│   │   └── styles              # Styling directory for modular styles
│   │       └── globals.css     # Global CSS styles
│   ├── components              # Reusable UI components
│   │   ├── Button.tsx          # Example button component
│   │   └── ...                 # Other UI components
│   ├── contracts               # Smart contract bindings and interaction logic
│   │   └── useContract.ts      # Hook for contract interactions
│   ├── hooks                   # Custom React hooks
│   │   └── useWallet.ts        # Hook for wallet connections and interactions
│   ├── state                   # Zustand state management logic
│   │   └── store.ts            # Zustand store setup
│   ├── types                   # TypeScript type definitions
│   │   └── index.d.ts          # Shared types across the project
│   ├── utils                   # Utility functions and constants
│   │   └── index.ts            # General utility functions
│   ├── wallets                 # Wallet integration logic
│   │   └── walletAdapter.ts    # Adapter for integrating various wallets
│   ├── config.ts               # Configuration file for major style choices
│   └── theme.ts                # Tailwind theme configuration
├── .eslintrc.js                # ESLint configuration
├── .gitignore                  # Files to be ignored by Git
├── next.config.js              # Next.js configuration file
├── package.json                # Project dependencies and scripts
├── postcss.config.js           # PostCSS configuration for Tailwind CSS
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── yarn.lock                   # Yarn lockfile for dependency versions
```

## Features

### 1. Smart Contract Integration (`contracts`)
The `contracts` folder contains all generated bindings and frontend logic for interacting with smart contracts. Hooks and utilities for contract interactions are centralized here.

- **Contract Hook:** `src/contracts/useContract.ts` provides hooks for easy interaction with smart contracts.

### 2. State Management (`state`)
State management is handled using Zustand, providing a smooth and intuitive development experience.

- **Store Setup:** The Zustand store is set up in `src/state/store.ts`, encapsulating all state logic and making it easy to access and update state throughout the application.

### 3. Shared Types (`types`)
All project-wide TypeScript type definitions are stored in the `src/types` directory, making type management consistent and reusable across different parts of the project.

### 4. UI Components (`components`)
Reusable UI components are located in the `src/components` directory. Tailwind CSS is used for styling, and Storybook integration allows for component-driven development and simplified debugging.

- **Example Components:** Components such as buttons, modals, and input fields are stored here.
- **Storybook Integration:** You can add Storybook for UI testing by configuring it according to the [Storybook documentation](https://storybook.js.org/docs/react/get-started/install).

### 5. Utilities (`utils`)
Helper functions, constants, and other utility methods are centralized in the `src/utils` directory.

- **Utility Functions:** General utility functions, such as formatters and validators, are stored in `src/utils/index.ts`.

### 6. Wallet Integration (`wallets`)

Wallet logic is contained in the `src/wallets` directory, providing a flexible adapter for integrating various wallets into the application.

- **Wallet Adapter:** The `walletClient.ts` file allows for the addition of new wallets with minimal configuration.

For more information on adding new wallets, please refer to the [Add Wallets Documentation](/docs/add-wallets.md).

### 7. Tailwind CSS Styling (`styles` & `tailwind.css`)
Tailwind CSS is used for styling the application. Configuration and custom themes are defined in `tailwind.config.js`.

- **Global Styles:** Global styles are defined in `src/app/styles/globals.css`.
- **Tailwind Configuration:** Additional customization and theme extensions are made in `tailwind.config.js`.

## Getting Started

### Prerequisites

- Node.js >= 18.x
- Yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate into the project directory:
   ```bash
   cd project-name
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```

### Running Locally

To start the development server, run:
```bash
yarn dev
```
This will launch the app at `http://localhost:3000` in testnet mode. To run the app in localnet mode, use:
```bash
yarn dev:local
```


### Static Export

If you need to generate a fully static site, run:
```bash
yarn build
```
This will create an `out` directory with static files that can be deployed to any static hosting service or CDN.

### Deploying

Copy the contents of the `out` directory (after running `yarn export`) to your hosting provider. Ensure that the server is configured to serve the `index.html` for any unknown routes (for SPAs).

## Customizing Styles

### Tailwind CSS

Tailwind CSS is used for styling. The configuration is defined in the `tailwind.config.js` file.

**Example Configuration in `tailwind.config.js`:**

```js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        background: '#f0f0f0',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### Global Styles

Global styles are defined in the `src/app/styles/globals.css` file. Modify this file to change base styles like font family, global margins, and padding.

### Major Style Choices

Major style choices like background color, primary color, and fonts can be controlled via the `tailwind.config.js` file or through CSS variables in the `src/styles/tailwind.css` file.

**Example CSS Variables in `tailwind.css`:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background-color: #f0f0f0;
  --primary-color: #3498db;
}
```

## Adding a New Page

1. Create a new folder and `page.tsx` file in the `src/app` directory.  
   **Example:** `src/app/contact/page.tsx`
   ```tsx
   import React from 'react';

   const Contact = () => (
     <div className="container mx-auto p-4">
       <h1 className="text-2xl font-bold">Contact Us</h1>
       <p>This is the contact page.</p>
     </div>
   );

   export default Contact;
   ```
2. Access the new page by navigating to `http://localhost:3000/contact`.

## Documentation

### ESLint

The project uses ESLint for code quality and consistency. Configuration is in the `.eslintrc.js` file.

### TypeScript

TypeScript is used throughout the project. You can modify the configuration in the `tsconfig.json` file.

## Contributing

1. **Create a new branch** from `main` for your feature or bugfix.
2. **Commit your changes** with clear and concise commit messages.
3. **Open a Pull Request** and ensure that all checks pass before requesting a review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please reach out to the project maintainers.