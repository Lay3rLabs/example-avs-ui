import { taskQueueAddresses } from "@/utils";
import Service from "./service";

/**
 * Generates static parameters for each task queue address.
 * This is used by Next.js to statically generate pages for each task queue address at build time.
 * 
 * Interactive functionality was moved to service.ts due to conflicts between use client and generateStaticParams
 *
 * @returns {Array<{ address: string }>} An array of objects containing the task queue addresses to be used as route parameters.
 */
export function generateStaticParams() {
  return taskQueueAddresses.map((item) => ({
    address: item.address,
  }));
}

/**
 * Page component renders the Service component with the task queue address.
 *
 * @param {Object} props - The properties passed to the Page component.
 * @param {Object} props.params - Route parameters provided by Next.js.
 * @param {string} props.params.address - The task queue address used to render the page.
 *
 * @returns {JSX.Element} The Page component with the Service component rendered for the specified address.
 */
export default function Page({ params }: { params: { address: string } }) {
  const { address } = params;

  return (
    <div>
      <Service address={address} />
    </div>
  );
}
