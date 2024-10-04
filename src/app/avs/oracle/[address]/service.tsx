"use client";
import TaskQueue from "@/components/TaskQueue/TaskQueue";
import { useEffect, useState } from "react";
import { TaskQueueEntryProps } from "@/types";
import { fetchTasks } from "@/utils/tasks";
import SubmitTask from "@/components/AddTask/AddTask";

/* eslint-disable @next/next/no-img-element */
export default function Service({ address }: { address: string }) {
  const [taskQueue, setTaskQueue] = useState<TaskQueueEntryProps[]>([]);

  const getTasks = async () => {
    const allTasks = await fetchTasks(address);
    setTaskQueue(allTasks);
  };

  useEffect(() => {
    getTasks();

    const intervalId = setInterval(() => {
      getTasks();
    }, 3000); 

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <section>
        <h1 className="font-bold text-text-primary text-[26px] mb-4">Services</h1>
        <div className="grid grid-cols-4 gap-4 pb-[40px] mb-[40px] border-b border-border-primary">
          <SubmitTask taskQueueAddressCustom={address} />
        </div>
      </section>
      <section>
        <h1 className="font-bold text-text-primary text-[26px] mb-4">Task Queue</h1>
        <TaskQueue entries={taskQueue} />
      </section>
    </div>
  );
}
