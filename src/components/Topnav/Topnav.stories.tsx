import { Meta, StoryObj } from "@storybook/react";
import Topnav from "./Topnav";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof Topnav> = {
  title: "Layout/Topnav",
  component: Topnav,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof Topnav>;

export const WalletConnected: Story = {
  args: {
    walletAddress: "GARX7YOCGEIOA5YQXCHA6ZM7764KLCFRVTTQJQZMPLJPCZKHY4KATVM3",
    onConnectWalletClick: () => {},
    onDisconnectWalletClick: () => {},
    navItems: [
      {
        label: "Services",
        href: "#",
      },
      {
        label: "AI Agents",
        href: "#",
      },
      {
        label: "Steven",
        href: "#",
      },
    ],
  },
};

export const WalletNotConnected: Story = {
  args: {
    walletAddress: undefined,
    onConnectWalletClick: () => {},
    onDisconnectWalletClick: () => {},
    navItems: [
      {
        label: "Services",
        href: "#",
      },
      {
        label: "AI Agents",
        href: "#",
      },
      {
        label: "Steven",
        href: "#",
      },
    ],
  },
};
