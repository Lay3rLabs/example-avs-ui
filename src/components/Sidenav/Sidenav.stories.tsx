import { Meta, StoryObj } from "@storybook/react";
import Sidenav from "./Sidenav";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof Sidenav> = {
  title: "Layout/Sidenav",
  component: Sidenav,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof Sidenav>;

export const Primary: Story = {
  args: {
    navItems: [
      {
        label: "Nav Item 1",
        icon: "arrow_forward_ios",
        active: true,
        href: "#",
      },
      {
        label: "Nav Item 2",
        icon: "arrow_forward_ios",
        active: false,
        href: "#",
      },
    ],
  },
};
