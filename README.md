# Example AVS UI

This repository is a Yarn monorepo managing multiple packages, each responsible for a distinct part of the application ecosystem. It provides a sample UI for your AVS project on Layer, written in React. This is designed to be a quick start for building demos, with a well-structured and scalable codebase and clearly defined responsibilities for each package.

## Packages

### `contracts`
This package contains all the generated bindings and smart contract frontend logic. It acts as the bridge between the smart contracts and the frontend application.

- **Location:** `packages/contracts`
- **Responsibilities:**
  - Generated smart contract bindings.
  - Logic for interacting with smart contracts.

### `core`
A Single Page Application (SPA) built using Vite. This is the main entry point of the frontend application.

- **Location:** `packages/core`
- **Responsibilities:**
  - Main frontend application.
  - Integration with other packages like state, ui, and wallets.

### `state`
All state management logic is centralized in this package. It primarily uses `zustand` to facilitate a smooth development experience for state management.

- **Location:** `packages/state`
- **Responsibilities:**
  - State management using `zustand`.
  - Global state shared across the application.

### `types`
This package contains all the type definitions shared across the project. It serves as the single source of truth for type definitions.

- **Location:** `packages/types`
- **Responsibilities:**
  - TypeScript type definitions.
  - Shared types for inter-package communication.

### `ui`
The UI component library of the project, built using Tailwind CSS. This package features Storybook for component-driven development and simpler debugging.

- **Location:** `packages/ui`
- **Responsibilities:**
  - UI components using Tailwind CSS.
  - Storybook for visual testing and debugging.

### `utils`
A collection of utility functions, constants, and other helper methods used throughout the project.

- **Location:** `packages/utils`
- **Responsibilities:**
  - Utility functions.
  - Common constants and helpers.

### `wallets`
All wallet-related logic is managed here. This package is designed as an adapter to support the easy addition of new wallets in the future.

- **Location:** `packages/wallets`
- **Responsibilities:**
  - Wallet connection and integration logic.
  - Wallet adapters to simplify the addition of new wallets.

## Getting Started

1. **Install Dependencies:**  
   Run `yarn install` from the root directory to install all dependencies across packages.

2. **Build Packages:**  
   Use `yarn build` to build all packages. This will generate the necessary build artifacts for each package.

3. **Run Development Server:**  
   Navigate to the `core` package and run `yarn dev` to start the development server.

4. **Storybook for UI Development:**  
   Navigate to the `ui` package and run `yarn storybook` to launch the Storybook development environment.

## Contributing

1. **Create a new branch** from `main` for your feature or bugfix.
2. **Commit your changes** with clear and concise commit messages.
3. **Open a Pull Request** and ensure that all checks pass before requesting a review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please reach out to the project maintainers.