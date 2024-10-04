import { TaskQueueClient } from "@/contracts/TaskQueue.client";
import { useAppStore } from "@/state/store";
import { taskQueueAddress } from "@/utils";
import React, { useState } from "react";

const SubmitTask: React.FC = ({
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
      <div>
        <label htmlFor="task-input">Enter a number:</label>
        <input
          id="task-input"
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button type="submit" disabled={isSubmitting || taskInput.trim() === ""}>
        {isSubmitting ? "Submitting..." : "Submit Task"}
      </button>
    </form>
  );
};

export default SubmitTask;
