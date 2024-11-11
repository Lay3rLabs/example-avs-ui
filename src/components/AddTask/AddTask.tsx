import { TaskQueueClient } from "@/contracts/TaskQueue.client";
import { useAppStore } from "@/state/store";
import React, { useState } from "react";
import { Card } from "../Card/Card";

/**
 * SubmitTask component allows users to submit a task to the task queue.
 * The task consists of a numerical value which will be processed through a math function.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} [props.taskQueueAddress] - Task queue address.
 *
 * @returns {JSX.Element | null} Returns the form to submit a task or null if wallet address or signing client is not available.
 */
const SubmitTask = ({ taskQueueAddress }: { taskQueueAddress: string }) => {
  const [taskInput, setTaskInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isInsufficientFunds, setIsInsufficientFunds] =
    useState<boolean>(false);
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
      taskQueueAddress
    );

    // Validate the input value
    if (isNaN(taskValue)) {
      setErrorMessage("Please enter a valid number.");
      return;
    }

    setErrorMessage(null);
    setIsInsufficientFunds(false);

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
        [{ amount: "1000000", denom: "ulayer" }]
      );

      setTaskInput(""); // Clear the input field on successful submission
    } catch (error) {
      console.error("Error submitting task:", error);
      if (
        error instanceof Error &&
        error.message.includes("insufficient funds")
      ) {
        setIsInsufficientFunds(true);
      } else {
        setErrorMessage("Failed to submit task.");
      }
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <div className="bg-background-primary border border-border-primary rounded-md p-1 inline-flex justify-center items-center">
          <span className="material-icons text-text-primary">calculate</span>
        </div>
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
          <button
            className="text-sm bg-background-button text-text-interactive-button rounded-md px-3 h-[34px]"
            type="submit"
            disabled={isSubmitting || taskInput.trim() === ""}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        {isInsufficientFunds && (
          <p className="text-red-500 text-sm">
            Insufficient funds. Please request more tokens from the{" "}
            <a
              href="https://t.me/LayerUp_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Telegram Bot
            </a>
            .
          </p>
        )}
      </Card>
    </form>
  );
};

export default SubmitTask;
