import { Meta, StoryObj } from "@storybook/react";
import TaskQueue from "./TaskQueue";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof TaskQueue> = {
  title: "General/TaskQueue",
  component: TaskQueue,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof TaskQueue>;

export const Primary: Story = {
  args: {
    entries: [
      {
        id: "0xe3f148A1c816d4cE05823fF41FE2b1a1Dc3c7b61",
        status: "QUEUED",
        addedTime: "2024-10-01T20:03:17+00:00",
        finishTime: undefined,
        json: JSON.stringify(
          {
            taskName: "ProcessData",
            priority: "high",
            details: {
              files: ["data1.csv", "data2.csv"],
              actions: ["filter", "aggregate"],
            },
          },
          null,
          2
        ),
      },
      {
        id: "0xe3f148A1c816d4cE05823fF41FE2b1a1Dc3c7b62",
        status: "COMPLETE",
        addedTime: "2024-10-01T20:03:17+00:00",
        finishTime: "2024-10-02T20:03:17+00:00",
        json: JSON.stringify(
          {
            taskName: "ProcessData",
            priority: "high",
            details: {
              files: ["data1.csv", "data2.csv"],
              actions: ["filter", "aggregate"],
            },
          },
          null,
          2
        ),
      },
      {
        id: "0xe3f148A1c816d4cE05823fF41FE2b1a1Dc3c7b63",
        status: "EXPIRED",
        addedTime: "2024-10-01T20:03:17+00:00",
        finishTime: "2024-10-02T20:03:17+00:00",
        json: JSON.stringify(
          {
            taskName: "ProcessData",
            priority: "high",
            details: {
              files: ["data1.csv", "data2.csv"],
              actions: ["filter", "aggregate"],
            },
          },
          null,
          2
        ),
      },
    ],
  },
};
