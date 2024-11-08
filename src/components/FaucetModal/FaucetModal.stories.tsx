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

    return (
      <FaucetModal
        {...args}
        open={isOpen}
        setOpen={(open) => {
          setIsOpen(open);
          args.setOpen(open);
        }}
      />
    );
  },
};
