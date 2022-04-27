import StatsCardsPurchase from "@/components/purchase/StatsCardsPurchase";
import PendingRequestTable from "@/components/purchase/table/PendingRequestTable";
import { usePurchase } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { fetcher } from "lib/fetcher"
import { useSWRConfig } from "swr"


export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = usePurchase();
  const [sItem, setSelected] = useState(0)
  const { mutate } = useSWRConfig()

  if (isLoading) return <p> Loading ... </p>

  const { orderRequests: ors } = data;

  console.log(data, ors[sItem]);

  const handleApprove = async (item: Number) => {
    console.log("handle approve", item, data);
    fetcher("/api/common/order/approve", { orderId: item }).then((d) => {
      console.log(d)
      mutate("/api/purchase")
    })
  }



  return (

        <>
             <StatsCardsPurchase orders={data.orderRequests} purchases={data.orderRequests.filter((item) => item.order_status == "Approved")}/>
      <div className="mt-4">
        <div className="rounded-lg ">
            <h2>Pending order Request</h2>
            {data.user.order_requests && <PendingRequestTable orderRequest={data.user.order_requests.filter((item) => item.order_status == "Pending")} />}
        </div>
      </div>

      
    <div className="p-4">
      <div className="p-2 my-4">
        <h1> Order Status </h1>
        <hr />
        {data.orderRequests.map((item, id) => <li key={id}>
          <button onClick={() => setSelected(id)}>{item.purchase_reason}</button> | {item.order_status} | requested by: {item.user.email} ...
        </li>)}
        <hr />
        <h2> Order Request Information </h2>
        {ors && ors[sItem] &&
          <div>
            <li> Purchase Reason: {ors[sItem].purchase_reason} | {ors[sItem].order_status} </li>
            <li> Items:
              <ul>
                {ors[sItem].order_items.map((item, i) =>
                  <li key={i}> {item.description} | {item.size} | {item.quantity} | {item.unit_price} | Type: {item.type} | Total: {item.amount} </li>)}
              </ul>
            </li>
            <li> Total cost: {ors[sItem].total_price} baht </li>
            <li> Approved by {ors[sItem].approval_by.map((item, k) =>
              <span key={k}>{item.role}</span>)}</li>
            <button onClick={e => handleApprove(ors[sItem].id)}> Approve </button>
            <br />
            <p> Remark: {ors[sItem].remark ? ors[sItem].remark : "No remark"} </p>

            <textarea name="reason" placeholder="Remarks (Rejected)" />
            <button> Reject </button>
          </div>
        }

      </div>
    </div>

 
</>
  )
}

