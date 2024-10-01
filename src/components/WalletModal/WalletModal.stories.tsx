import { Meta, StoryObj } from "@storybook/react";
import { WalletModal } from "./WalletModal";
import { useState } from "react";
import { WalletTypes } from "@/types";

// Default metadata for the story
const meta: Meta<typeof WalletModal> = {
  title: "Components/WalletModal",
  component: WalletModal,
  argTypes: {
    open: { control: "boolean" },
    onWalletClick: { action: "wallet clicked" },
    setOpen: { action: "set open" },
  },
};

export default meta;

// The story type for the component
type Story = StoryObj<typeof WalletModal>;

export const DefaultWalletModal: Story = {
  args: {
    open: true,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.open);

    // Mock asynchronous wallet connection function
    const mockOnWalletClick = async (wallet: WalletTypes) => {
      args.onWalletClick(wallet);
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000); // Simulate a 2-second delay for the wallet connection
      });
    };

    return (
      <WalletModal
        {...args}
        open={isOpen}
        setOpen={(open) => {
          setIsOpen(open);
          args.setOpen(open);
        }}
        onWalletClick={mockOnWalletClick} // Pass the mock async function
      />
    );
  },
};
