import { TaskQueueEntryProps, TaskQueueProps } from "@/types";
import classNames from "classnames";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

const customTheme = {
  ...darcula,
  'code[class*="language-"]': {
    ...darcula['code[class*="language-"]'],
    fontSize: "12px",
  },
};

const TaskQueue: React.FC<
  TaskQueueProps & React.HTMLAttributes<HTMLDivElement>
> = ({ entries, ...props }) => {
  const [expandedEntry, setExpandedEntry] = useState<string | undefined>(
    undefined
  );

  const handleToggleExpand = (id: string) => {
    setExpandedEntry((prevId) => (prevId === id ? undefined : id));
  };

  return (
    <div className="bg-background" {...props}>
      <div className="flex text-text-tertiary text-xs gap-4 px-3 py-2">
        <p className="min-w-[150px]">Task ID</p>
        <p className="min-w-[150px]">Status</p>
        <p className="min-w-[240px]">Added on</p>
        <p className="flex-1">Finished on</p>
      </div>
      <div>
        {entries.map((entry: TaskQueueEntryProps, index: number) => {
          const statusColor = classNames({
            "bg-background-interactive-warning text-text-interactive-warning":
              entry.status === "QUEUED",
            "bg-background-interactive-valid text-text-interactive-valid":
              entry.status === "COMPLETE",
            "bg-background-interactive-error text-text-interactive-error":
              entry.status === "EXPIRED",
          });

          return (
            <div
              className="px-3 py-4 hover:bg-background-interactive-hover bg-background odd:bg-background-tertiary"
              key={index}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleToggleExpand(entry.id)}
              >
                <div className="flex gap-4 items-center">
                  <p className="min-w-[150px] text-sm text-text-body">
                    {entry.id.slice(0, 4)}...{entry.id.slice(-4)}
                  </p>
                  <p className="min-w-[150px]">
                    <span
                      className={`text-sm px-1.5 py-1.5 rounded-[4px] ${statusColor}`}
                    >
                      {entry.status}
                    </span>
                  </p>
                  <p className="min-w-[240px] text-sm text-text-secondary">
                    {entry.addedTime}
                  </p>
                  <p className="flex-1 text-sm text-text-secondary">
                    {entry.finishTime ? entry.finishTime : "-"}
                  </p>
                </div>

                <button className="h-6">
                  <span className="material-icons text-text-secondary">
                    {expandedEntry === entry.id
                      ? "keyboard_arrow_down"
                      : "keyboard_arrow_right"}
                  </span>
                </button>
              </div>
              {expandedEntry === entry.id && (
                <div className="mt-4 code-highlighter">
                  <SyntaxHighlighter language="json" style={customTheme}>
                    {entry.json}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskQueue;
