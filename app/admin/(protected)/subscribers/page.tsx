import { getAllSubscribers } from "@/lib/data/subscribers";
import SubscribersClient from "@/components/admin/SubscribersClient";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  const subscribers = await getAllSubscribers();

  return (
    <div className="p-8 max-w-[1100px]">
      <SubscribersClient initial={subscribers} />
    </div>
  );
}
