// AiBouncer.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import AiBouncer from "./AiBouncer";

// Default metadata of the story
const meta: Meta<typeof AiBouncer> = {
  title: "Widgets/AiBouncer",
  component: AiBouncer,
};

export default meta;

type Story = StoryObj<typeof AiBouncer>;

export const Default: Story = {
  args: {
    messages: [
      {
        id: 1,
        sender: "bouncer",
        timestamp: "2024-21-09 12:34:18 UTC",
        text: "Before I let you in, I need to check your ID.",
      },
    ],
  },
};

export const StepOne: Story = {
  args: {
    messages: [
      {
        id: 1,
        sender: "bouncer",
        timestamp: "2024-21-09 12:34:18 UTC",
        text: "Great! I see you have a valid NFT for entry.",
      },
      {
        id: 2,
        sender: "bouncer",
        timestamp: "2024-21-09 12:34:18 UTC",
        text: "However, policy states that I still need to do a vibe check. What's your opinion on decentralized governance?",
      },
      {
        id: 3,
        sender: "user",
        timestamp: "2024-21-09 12:35:00 UTC",
        text: "I think decentralized governance is great, and we should do more of it.",
        status: "> You responded",
        statusColor: "purple",
      },
    ],
  },
};

export const AccessGranted: Story = {
  args: {
    messages: [
      {
        id: 1,
        sender: "bouncer",
        timestamp: "2024-21-09 12:34:18 UTC",
        text: "Let’s see, Radiohead seems to be in.",
        status: "> Bouncer did some random stuff!",
        statusColor: "green",
      },
      {
        id: 2,
        sender: "user",
        timestamp: "2024-21-09 12:34:30 UTC",
        text: "The King of Limbs",
        status: "> You responded",
        statusColor: "purple",
      },
      {
        id: 3,
        sender: "bouncer",
        timestamp: "2024-21-09 12:34:45 UTC",
        text: "Excellent, welcome aboard, Gregory",
      },
    ],
  },
};
