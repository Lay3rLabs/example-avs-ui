export interface TaskQueueEntryProps {
  id: string;
  status: "QUEUED" | "COMPLETE" | "EXPIRED";
  addedTime: string;
  finishTime: string | undefined;
  json: string;
}

export interface TaskQueueProps {
  entries: TaskQueueEntryProps[];
}
