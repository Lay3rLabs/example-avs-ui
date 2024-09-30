import { TasksTableEntryProps, TasksTableProps } from "@/types";
import React from "react";

/**
 * A table component that displays a list of tasks with their details.
 * Allows clicking on a row to trigger an action based on the task's ID.
 * 
 * @param {TasksTableProps & React.HTMLAttributes<HTMLTableElement>} props - The props for the component, which include task entries, a click handler, and any additional HTML table attributes.
 * @returns {JSX.Element} The rendered table component.
 */
const TasksTable: React.FC<
  TasksTableProps & React.HTMLAttributes<HTMLTableElement>
> = ({ entries, onEntryClick, ...props }) => {
  return (
    <div className="border border-border-primary bg-background rounded-md" {...props}>
      <table className="w-full text-sm text-left rtl:text-right p-3 space-y-3">
        <thead className="text-xs uppercase text-text-primary border-b border-border-primary">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Operator
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry: TasksTableEntryProps, index: number) => (
            <tr
              key={index}
              onClick={() => onEntryClick(entry.id)}
              className="[&:not(:last-child)]:border-b border-border-primary text-text-body hover:bg-background-interactive-hover"
            >
              <th
                scope="row"
                className="px-6 py-2 font-medium whitespace-nowrap"
              >
                {entry.id}
              </th>
              <td className="px-6 py-2">{entry.type}</td>
              <td className="px-6 py-2">{entry.status}</td>
              <td className="px-6 py-2">{entry.operator}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
