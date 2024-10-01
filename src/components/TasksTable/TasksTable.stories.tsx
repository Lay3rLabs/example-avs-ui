import { Meta, StoryObj } from '@storybook/react';
import TasksTable from './TasksTable';

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof TasksTable> = {
  title: "General/TasksTable",
  component: TasksTable,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof TasksTable>;

export const Primary: Story = {
  args: {
    entries: [{
      id: 1,
      type: "BAR",
      status: "WAITING",
      operator: "1234"
    }, {
      id: 2,
      type: "BAR",
      status: "WAITING",
      operator: "1234"
    }, {
      id: 3,
      type: "BAR",
      status: "WAITING",
      operator: "1234"
    }]
  },
};
