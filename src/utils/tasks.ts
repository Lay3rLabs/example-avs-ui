import {
  CompletedTaskOverview,
  OpenTaskOverview,
} from "@/contracts/TaskQueue.types";
import { TaskQueueEntryProps } from "@/types";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { taskQueueAddress, HacknetConfig } from "./constants";
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
        addedTime: new Date(task.expires * 1000).toISOString(), // assuming `expires` is in seconds
        finishTime: undefined, // Not finished yet
        json: JSON.stringify(task.payload),
      };
    } else {
      // It's a CompletedTaskOverview
      return {
        id: task.id.toString(),
        status: "COMPLETE",
        addedTime: new Date(task.completed * 1000).toISOString(), // assuming `completed` is in seconds
        finishTime: new Date(task.completed * 1000).toISOString(), // Same as completed time
        json: JSON.stringify(task.result),
      };
    }
  });
};

export const fetchTasks = async (taskQueueAddressCustom?: string) => {
  const cosmWasmClient = await CosmWasmClient.connect(
    HacknetConfig.rpc_endpoint
  );
  const taskQueueQueryClient = new LayerTaskQueue.TaskQueueQueryClient(
    cosmWasmClient,
    taskQueueAddressCustom ? taskQueueAddressCustom : taskQueueAddress
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
