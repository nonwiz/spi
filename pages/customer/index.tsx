import CreateOrderReq from "@/components/customer/createOrderReqModal";
import FormCreateOrderRequest from "@/components/customer/createOrderRequest";
import OrderRequestTable from "@/components/customer/tables/OrderRequestTable";

import { useCustomer } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = useCustomer();
  if (isLoading) return <p> Loading ... </p>

  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  
  const createOrder = () =>{
    setVisible(true);
  }


  const closeHandler = () => {
    setVisible(false);
  };

  return (
      <>
      <CreateOrderReq
          type={type}
          visible={visible} 
          closeHandler={closeHandler} 
          orderTypes={data.orderTypes} 
          />
      <div className="my-8 flex flex-row gap-6 w-full">
        <button onClick={createOrder} className="primary-btn"> Create Order Request</button>
        <button className="primary-btn"> Create Moving Request</button>
      </div>

      <div className="">
        <div className=" rounded-lg ">
            <h2>Recent order Request</h2>
            {data.user.order_requests && <OrderRequestTable orderRequest={data.user.order_requests} />}

        </div>

       
      </div>


      <div className="p-4">
        
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
      </>




  )
}

