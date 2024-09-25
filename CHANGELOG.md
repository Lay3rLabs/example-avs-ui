# Changelog

All notable changes to this project will be documented in this file.

## Unversioned

### Added
- Initial setup of the project using Next.js with TypeScript and Tailwind CSS. 
- Integrated the following features from the previous monorepo:
  - **State Management:** Zustand state store setup for smooth state management.
  - **Utils:** Utility functions and constants.
  - **Wallet Integration:** Wallet adapter setup for easy addition of new wallets. Added Keplr and Leap.
  - **Global Types:** Project-wide TypeScript type definitions.
- Added basic folder structure for a modular and maintainable codebase.
- Added storybook for isolated component environment
  - Theme switcher
  - dark and light theme

### Configuration
- Set up basic Next.js configuration in `next.config.js`.
- Configured TypeScript with `tsconfig.json`.
- Integrated ESLint with custom configuration for code quality checks.
