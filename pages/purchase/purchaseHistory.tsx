import { usePurchase } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function MyItems() {
  const { data: session } = useSession();
  const { data, isLoading } = usePurchase();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");

  if (isLoading) return <p> Loading ... </p>

  // Order requests whose status is not pending 
  const ors = data.orderRequests.filter(item => item.order_status != "Pending")



  
  return (
      <div className="flex justify-center items-center h-96">
        {ors.map((item, index) => 
        <li key={index}> {item.purchase_reason} - {item.order_status} </li>
          )} 
      </div>
  )}