import Layout from "@/components/layout"
import { useFinance } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { fetcher } from "lib/fetcher"
import { useSWRConfig } from "swr"
import StatsCardsPurchase from "@/components/purchase/StatsCardsPurchase";
import PendingRequestTable from "@/components/purchase/table/PendingRequestTable";
import { EmptyState } from "@/components/EmptyState";


export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = useFinance();
  const [sItem, setSelected] = useState(0)
  const { mutate } = useSWRConfig()
  const [comment, setComment] = useState("");

  if (isLoading) return <p> Loading ... </p>

  const { orderRequests: ors } = data;

  console.log(data, ors[sItem]);

  

  return (
    <>
      {/* <StatsCardsPurchase orders={data.orderRequests} purchases={data.orderRequests.filter((item) => item.order_status == "Approved")} />  */}
      <div className="mt-4">
        <div className="rounded-lg ">
          <h2>Pending order Request</h2>

        {(data.orderRequests)
          ?
            <PendingRequestTable pageType={"finance"} email={data.user.email} orderRequest={data.orderRequests.filter((item) => item.order_status == "Pending")} />
          :
            <EmptyState msg={"No Pending Order Request"} />}
        </div>
      </div>

    </>
  )
}
