import FormCreateOrderRequest from "@/components/customer/createOrderRequest";
import Layout from "@/components/layout"
import { useCustomer } from "lib/fetcher";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = useCustomer();

  if (isLoading) return <p> Loading ... </p>

  console.log(data);

  return (
      <div className="p-4">
        <div className="p-2 my-4">
          <h1> Order Status </h1>
          <hr />
          {data.user.order_requests.map((item, id) => <li key={id}>
            {item.purchase_reason} | {item.order_status}
          </li>)}
        </div>
        <FormCreateOrderRequest orderTypes={data.orderTypes} />
        <hr />
        <h2> Personal Information </h2>
        <li> {data.user.name} | {data.user.location ? `${data.user.location.zone} ${data.user.location.room_number}` : "Not assigned"} | {data.user.department && data.user.department.name}</li>
        <h2> List of items within a room </h2>
        {data.user.location && data.user.location.items && 
        data.user.location.items.map((item, id) => 
          <li key={id}> {item.name}</li>
        )}
      </div>
  )
}

