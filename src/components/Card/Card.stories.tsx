import { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "./Card";

// Default metadata for the story
const meta: Meta<typeof Card> = {
  title: "General/Card",
  component: Card
};

export default meta;

// The story type for the component
type Story = StoryObj<typeof Card>;

export const DefaultCard: Story = {
  args: {},
  render: (args) => (
    <Card {...args}>
      <CardHeader>Test</CardHeader>
      <CardBody>
        <p>Card content goes here.</p>
      </CardBody>
      <CardFooter>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Save changes
        </button>
      </CardFooter>
    </Card>
  ),
};
