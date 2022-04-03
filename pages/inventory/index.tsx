import Layout from "@/components/layout"
import { useInventory } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = useInventory();
  const [sItem, setSelected] = useState(0)

  if (isLoading) return <p> Loading ... </p>

  const { orderRequests: ors } = data;

  console.log(data, ors[sItem]);

  const handleApprove = (item) => {
    console.log("approved item", item)
  }

  return (
    <Layout>
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
              <li> Items:
                <ul>
                </ul>
              </li>
              <button onClick={handleApprove(ors[sItem])}> Approve </button>
              <br />
              <p> Remark: {ors[sItem].remark ? ors[sItem].remark : "No remark"} </p>

              <textarea name="reason">Rejected reason:</textarea>
              <button> Reject </button>
            </div>
          }

        </div>
      </div>
    </Layout>
  )
}

