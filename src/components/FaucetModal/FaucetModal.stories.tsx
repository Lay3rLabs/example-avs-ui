import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FaucetModal } from "./FaucetModal";

// Default metadata for the story
const meta: Meta<typeof FaucetModal> = {
  title: "Components/FaucetModal",
  component: FaucetModal,
  argTypes: {
    open: { control: "boolean" },
    setOpen: { action: "setOpen" },
    requestTokens: { action: "requestTokens" },
  },
};

export default meta;

// The story type for the component
type Story = StoryObj<typeof FaucetModal>;

export const DefaultFaucetModal: Story = {
  args: {
    open: true,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.open);

    // Simulated async function to request tokens
    const mockRequestTokens = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      args.requestTokens();
    };

    return (
      <FaucetModal
        {...args}
        open={isOpen}
        setOpen={(open) => {
          setIsOpen(open);
          args.setOpen(open);
        }}
        requestTokens={mockRequestTokens}
      />
    );
  },
};
