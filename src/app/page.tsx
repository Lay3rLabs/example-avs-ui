"use client";
import { LayerTaskQueue } from "@/contracts";
import { TestnetConfig } from "@/utils";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useEffect } from "react";

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  const taskQueueAddress =
    "layer14wx6ax8tqtvh3mra9f0xswdhh8jjrx63qs5ahqnjzlvu8sps2p7qfeevdw";

  const test = async () => {
    const cosmWasmClient = await CosmWasmClient.connect(
      TestnetConfig.rpc_endpoint
    );
    const taskQueueQueryClient = new LayerTaskQueue.TaskQueueQueryClient(
      cosmWasmClient,
      taskQueueAddress
    );

    const asd = await taskQueueQueryClient.listOpen({});
    console.log(asd);
  };
  useEffect(() => {
    test();
  }, []);
  return <div></div>;
}
