import Layout from "@/components/layout"
import { usePurchase } from "lib/fetcher";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = usePurchase();

  if (isLoading) return <p> Loading ... </p>

  console.log(data);

  return (
    <Layout>
      <div className="p-4">
        <div className="p-2 my-4">
          <h1> Order Status </h1>
          <hr />
          {data.orderRequests.map((item, id) => <li key={id}>
            <button onClick={() => console.log("test")}>{item.purchase_reason}</button> | {item.order_status} | Approve by | Approve
          </li>)}
        </div>
      </div>
    </Layout>
  )
}

