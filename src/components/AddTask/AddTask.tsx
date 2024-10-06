import { TaskQueueClient } from "@/contracts/TaskQueue.client";
import { useAppStore } from "@/state/store";
import { taskQueueAddress } from "@/utils";
import React, { useState } from "react";
import { Card } from "../Card/Card";

/**
 * SubmitTask component allows users to submit a task to the task queue.
 * The task consists of a numerical value which will be processed through a math function.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} [props.taskQueueAddressCustom] - Optional custom task queue address to override the default.
 *
 * @returns {JSX.Element | null} Returns the form to submit a task or null if wallet address or signing client is not available.
 */
const SubmitTask = ({
  taskQueueAddressCustom,
  title = "AVS",
  description = "Input to submit to service.",
}: {
  taskQueueAddressCustom?: string;
  title?: string;
  description?: string;
}) => {
  const [taskInput, setTaskInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const appStore = useAppStore();

  // Return null if the wallet address or CosmWasm signing client is not available
  if (!appStore.wallet.address || !appStore.cosmWasmSigningClient) {
    return null;
  }

  /**
   * Handles form submission to create a new task in the task queue.
   * The task input is validated and submitted using the TaskQueueClient.
   *
   * @async
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const taskValue = parseInt(taskInput, 10);
    const taskQueueClient = new TaskQueueClient(
      appStore.cosmWasmSigningClient!,
      appStore.wallet.address,
      taskQueueAddressCustom ? taskQueueAddressCustom : taskQueueAddress,
    );

    // Validate the input value
    if (isNaN(taskValue)) {
      setErrorMessage("Please enter a valid number.");
      return;
    }

    setErrorMessage(null);

    const payload = { x: taskValue };

    try {
      setIsSubmitting(true);

      // Submit the task to the task queue
      await taskQueueClient.createTask(
        {
          description: "New Task",
          timeout: undefined,
          payload,
        },
        "auto",
        undefined,
        [{ amount: "1000000", denom: "uperm" }],
      );

      setTaskInput(""); // Clear the input field on successful submission
    } catch (error) {
      console.error("Error submitting task:", error);
      setErrorMessage("Failed to submit task.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <div className="bg-background-primary border border-border-primary rounded-md p-1 inline-flex justify-center items-center">
          <span className="material-icons text-text-primary">computer</span>
        </div>
        <p className="text-text-primary font-semibold mb-1">{title}</p>
        {/* <p className="text-text-brand text-[13px] mb-5 !mt-0">Math Function</p> */}
        <p className="text-text-tertiary text-[12px]">{description}</p>
        <div className="flex gap-2">
          <input
            id="task-input"
            type="text"
            className="!mt-0 bg-background-primary outline-none text-text-primary text-sm px-1.5 py-1.5 border border-border-primary rounded-md flex-1 min-w-0"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            disabled={isSubmitting}
          />
          <button
            className="text-sm bg-background-button text-text-interactive-button rounded-md px-3 h-[34px]"
            type="submit"
            disabled={isSubmitting || taskInput.trim() === ""}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </Card>
    </form>
  );
};

export default SubmitTask;
