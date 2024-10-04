import { taskQueueAddresses } from "@/utils";
import Service from "./service";

export function generateStaticParams() {
  return taskQueueAddresses.map((item) => ({
    address: item.address,
  }));
}

export default function Home({ params }: { params: { address: string } }) {
  const { address } = params;

  return (
    <div>
      <Service address={address} />
    </div>
  );
}
