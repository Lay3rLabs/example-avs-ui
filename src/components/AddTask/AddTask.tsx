import { TaskQueueClient } from "@/contracts/TaskQueue.client";
import { useAppStore } from "@/state/store";
import { taskQueueAddress } from "@/utils";
import React, { useState } from "react";
import { Card } from "../Card/Card";

const SubmitTask = ({
  taskQueueAddressCustom,
}: {
  taskQueueAddressCustom?: string;
}) => {
  const [taskInput, setTaskInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const appStore = useAppStore();

  if (!appStore.wallet.address || !appStore.cosmWasmSigningClient) {
    return;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const taskValue = parseInt(taskInput, 10);
    const taskQueueClient = new TaskQueueClient(
      appStore.cosmWasmSigningClient!,
      appStore.wallet.address,
      taskQueueAddressCustom ? taskQueueAddressCustom : taskQueueAddress
    );
    if (isNaN(taskValue)) {
      setErrorMessage("Please enter a valid number.");
      return;
    }

    // Reset error message if valid input
    setErrorMessage(null);

    // Format the payload as {"x": taskValue}
    const payload = { x: taskValue };

    try {
      setIsSubmitting(true);

      // Call createTask method from TaskQueueClient
      await taskQueueClient.createTask(
        {
          description: "New Task",
          timeout: undefined, // Use undefined for no timeout, or provide a specific timeout
          payload,
        },
        "auto",
        undefined,
        [{ amount: "1000000", denom: "uperm" }]
      );

      setTaskInput(""); // Reset input on successful submit
    } catch (error) {
      console.error("Error submitting task:", error);
      setErrorMessage("Failed to submit task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <p className="text-text-primary font-semibold mb-1">Compute Squares</p>
        <p className="text-text-brand text-[13px] mb-5 !mt-0">Math Function</p>
        <p className="text-text-tertiary text-[12px]">Enter a number:</p>
        <div className="flex !mt-1 gap-2">
          <input
            id="task-input"
            type="text"
            className="!mt-0 bg-background-primary outline-none text-text-primary text-sm px-1.5 py-1.5 border border-border-primary rounded-md flex-1 min-w-0"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            disabled={isSubmitting}
          />
          <button className="text-sm bg-background-button text-text-interactive-button rounded-md px-3 h-[34px]" type="submit" disabled={isSubmitting || taskInput.trim() === ""}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </Card>
    </form>
  );
};

export default SubmitTask;
