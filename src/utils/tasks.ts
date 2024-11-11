import {
  CompletedTaskOverview,
  OpenTaskOverview,
} from "@/contracts/TaskQueue.types";
import { TaskQueueEntryProps } from "@/types";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { HacknetConfig } from "./constants";
import { LayerTaskQueue } from "@/contracts";

export const convertTasksToTaskQueueEntryProps = (
  tasks: (OpenTaskOverview | CompletedTaskOverview)[]
): TaskQueueEntryProps[] => {
  return tasks.map((task) => {
    if ("expires" in task) {
      // It's an OpenTaskOverview
      return {
        id: task.id.toString(),
        status: "QUEUED",
        addedTime: new Date(Number(task.expires) / 1e6).toISOString(), // assuming `expires` is in nanoseconds.
        finishTime: undefined, // Not finished yet
        json: JSON.stringify(task.payload),
      };
    } else {
      // It's a CompletedTaskOverview
      return {
        id: task.id.toString(),
        status: "COMPLETE",
        addedTime: new Date(Number(task.completed) / 1e6).toISOString(), // assuming `completed` is in nanoseconds.
        finishTime: new Date(Number(task.completed) / 1e6).toISOString(), // Same as completed time
        json: JSON.stringify(task.result),
      };
    }
  });
};

export const fetchTasks = async (taskQueueAddress: string) => {
  const cosmWasmClient = await CosmWasmClient.connect(
    HacknetConfig.rpc_endpoint
  );
  const taskQueueQueryClient = new LayerTaskQueue.TaskQueueQueryClient(
    cosmWasmClient,
    taskQueueAddress
  );

  // Get completed tasks
  const tasksCompleted = await taskQueueQueryClient.listCompleted({});
  const tasksCompletedConverted = convertTasksToTaskQueueEntryProps(
    tasksCompleted.tasks
  );

  // Get open tasks
  const tasksOpen = await taskQueueQueryClient.listOpen({});
  const tasksOpenConverted = convertTasksToTaskQueueEntryProps(tasksOpen.tasks);

  // Merge both types
  return [...tasksOpenConverted, ...tasksCompletedConverted];
};
