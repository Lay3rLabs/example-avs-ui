export interface TasksTableEntryProps {
  id: number;
  type: "FOO" | "BAR";
  status: "WAITING" | "DONE";
  operator: string;
}

export interface TasksTableProps {
  entries: TasksTableEntryProps[];
  onEntryClick: (id: number) => void;
}
