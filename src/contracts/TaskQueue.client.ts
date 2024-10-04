import {
  CosmWasmClient,
  SigningCosmWasmClient,
  ExecuteResult,
} from "@cosmjs/cosmwasm-stargate";
import {
  TaskResponse,
  ListOpenResponse,
  ListCompletedResponse,
  TaskStatusResponse,
  ConfigResponse,
} from "./TaskQueue.types";
import { Coin, StdFee } from "@cosmjs/amino";

export interface TaskQueueReadOnlyInterface {
  contractAddress: string;

  task: ({ id }: { id: string }) => Promise<TaskResponse>;
  taskStatus: ({ id }: { id: string }) => Promise<TaskStatusResponse>;
  listOpen: ({
    start_after,
    limit,
  }: {
    start_after?: string;
    limit?: number;
  }) => Promise<ListOpenResponse>;
  listCompleted: ({
    start_after,
    limit,
  }: {
    start_after?: string;
    limit?: number;
  }) => Promise<ListCompletedResponse>;
  config: () => Promise<ConfigResponse>;
}

export interface TaskQueueInterface extends TaskQueueReadOnlyInterface {
  createTask: (
    {
      description,
      payload,
      timeout,
    }: {
      description: string;
      payload: { [key: string]: unknown };
      timeout?: number | null;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;

  completeTask: (
    {
      taskId,
      response,
    }: {
      taskId: string;
      response: { [key: string]: unknown };
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;

  timeoutTask: (
    {
      taskId,
    }: {
      taskId: string;
    },
    fee?: number | StdFee | "auto",
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>;
}

export class TaskQueueQueryClient implements TaskQueueReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;

    this.task = this.task.bind(this);
    this.taskStatus = this.taskStatus.bind(this);
    this.listOpen = this.listOpen.bind(this);
    this.listCompleted = this.listCompleted.bind(this);
    this.config = this.config.bind(this);
  }

  task = async ({ id }: { id: string }): Promise<TaskResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      task: { id },
    });
  };

  taskStatus = async ({ id }: { id: string }): Promise<TaskStatusResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      task_status: { id },
    });
  };

  listOpen = async ({
    start_after,
    limit,
  }: {
    start_after?: string;
    limit?: number;
  }): Promise<ListOpenResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_open: { start_after, limit },
    });
  };

  listCompleted = async ({
    start_after,
    limit,
  }: {
    start_after?: string;
    limit?: number;
  }): Promise<ListCompletedResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_completed: { start_after, limit },
    });
  };

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {},
    });
  };
}

export class TaskQueueClient
  extends TaskQueueQueryClient
  implements TaskQueueInterface
{
  client: SigningCosmWasmClient;
  sender: string;

  constructor(
    client: SigningCosmWasmClient,
    sender: string,
    contractAddress: string
  ) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;

    this.createTask = this.createTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.timeoutTask = this.timeoutTask.bind(this);
  }

  createTask = async (
    {
      description,
      payload,
      timeout,
    }: {
      description: string;
      payload: { [key: string]: unknown };
      timeout?: number | null;
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return this.client.execute(
      this.sender,
      this.contractAddress,
      {
        create: {
          description,
          payload,
          timeout,
        },
      },
      fee,
      memo,
      funds
    );
  };

  completeTask = async (
    {
      taskId,
      response,
    }: {
      taskId: string;
      response: { [key: string]: unknown };
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return this.client.execute(
      this.sender,
      this.contractAddress,
      {
        complete: {
          task_id: taskId,
          response,
        },
      },
      fee,
      memo,
      funds
    );
  };

  timeoutTask = async (
    {
      taskId,
    }: {
      taskId: string;
    },
    fee: number | StdFee | "auto" = "auto",
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return this.client.execute(
      this.sender,
      this.contractAddress,
      {
        timeout: {
          task_id: taskId,
        },
      },
      fee,
      memo,
      funds
    );
  };
}
