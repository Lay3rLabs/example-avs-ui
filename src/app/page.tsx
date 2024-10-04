"use client";
import { redirect } from 'next/navigation'
import { taskQueueAddresses } from "@/utils";

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  redirect(`/avs/oracle/${taskQueueAddresses[0].address}`);
}
