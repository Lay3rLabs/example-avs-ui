import { Meta, StoryObj } from "@storybook/react";
import Sidenav from "./Sidenav";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof Sidenav> = {
  title: "General/Sidenav",
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
        icon: "foo",
        active: true,
        href: "#",
      },
      {
        label: "Nav Item 2",
        icon: "foo",
        active: false,
        href: "#",
      },
    ],
  },
};
