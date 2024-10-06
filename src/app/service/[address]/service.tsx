"use client";
import TaskQueue from "@/components/TaskQueue/TaskQueue";
import { useEffect, useState } from "react";
import { TaskQueueEntryProps } from "@/types";
import { fetchConfig, fetchTasks } from "@/utils/tasks";
import SubmitTask from "@/components/AddTask/AddTask";
import { ConfigResponse } from "@/contracts/TaskQueue.types";

/* eslint-disable @next/next/no-img-element */

/**
 * Service component fetches and displays tasks from the task queue and allows submission of new tasks.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.address - The address of the task queue to fetch tasks from and submit tasks to.
 *
 * @returns {JSX.Element} The Service component that displays the task queue and task submission form.
 */
export default function Service({ address }: { address: string }) {
  const [taskQueue, setTaskQueue] = useState<TaskQueueEntryProps[]>([]);
  const [config, setConfig] = useState<ConfigResponse>();

  /**
   * Fetches the tasks from the task queue based on the provided address and updates the task queue state.
   *
   * @async
   * @returns {Promise<void>} A promise that resolves when the tasks have been fetched and the state has been updated.
   */
  const getTasks = async () => {
    const allTasks = await fetchTasks(address);
    setTaskQueue(allTasks);
  };

  // Get the task config to display info about the service
  const getConfig = async () => {
    const res = await fetchConfig(address);
    console.log(res);
    setConfig(res);
  };

  // Fetch tasks when the component is mounted and set an interval to fetch tasks every 3 seconds
  useEffect(() => {
    getTasks();
    getConfig();

    const intervalId = setInterval(() => {
      getTasks();
    }, 3000); // Poll for new tasks every 3 seconds

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, []);

  return (
    <div>
      <section>
        <div className="grid grid-cols-4 gap-4 pb-[40px] mb-[40px] border-b border-border-primary">
          <SubmitTask
            taskQueueAddressCustom={address}
            title={config?.title}
            description={config?.description}
          />
        </div>
      </section>
      <section>
        <h1 className="font-bold text-text-primary text-[26px] mb-4">
          Task Queue
        </h1>
        <TaskQueue entries={taskQueue} />
      </section>
    </div>
  );
}
