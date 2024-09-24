import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ExampleComponent } from "../src";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof ExampleComponent> = {
  title: "Layout/ExampleComponent",
  component: ExampleComponent,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof ExampleComponent>;

export const TestComponent: Story = {};
