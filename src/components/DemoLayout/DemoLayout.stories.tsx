import { Meta, StoryObj } from "@storybook/react";
import DemoLayout from "./DemoLayout";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof DemoLayout> = {
  title: "Layout/DemoLayout",
  component: DemoLayout,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof DemoLayout>;

export const Primary: Story = {
  args: {
  },
};
