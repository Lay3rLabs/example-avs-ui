"use client";
import TaskQueue from "@/components/TaskQueue/TaskQueue";
import { useEffect, useState } from "react";
import { TaskQueueEntryProps } from "@/types";
import { fetchTasks } from "@/utils/tasks";
import SubmitTask from "@/components/AddTask/AddTask";

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  const [taskQueue, setTaskQueue] = useState<TaskQueueEntryProps[]>([]);

  const getTasks = async () => {
    const allTasks = await fetchTasks();
    setTaskQueue(allTasks);
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
      <SubmitTask />
      <TaskQueue entries={taskQueue} />
    </div>
  );
}
