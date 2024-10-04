import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import {
  TaskResponse,
  ListOpenResponse,
  ListCompletedResponse,
  TaskStatusResponse,
  ConfigResponse,
} from "./TaskQueue.types";

export interface YourContractReadOnlyInterface {
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

export class YourContractQueryClient implements YourContractReadOnlyInterface {
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
      task: {
        id,
      },
    });
  };

  taskStatus = async ({ id }: { id: string }): Promise<TaskStatusResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      task_status: {
        id,
      },
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
      list_open: {
        start_after,
        limit,
      },
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
      list_completed: {
        start_after,
        limit,
      },
    });
  };

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {},
    });
  };
}
