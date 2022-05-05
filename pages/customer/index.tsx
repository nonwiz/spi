import CreateOrderReq from "@/components/customer/createOrderReqModal";
import FormCreateOrderRequest from "@/components/customer/createOrderRequest";
import OrderRequestTable from "@/components/customer/tables/OrderRequestTable";
import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";

import { useCustomer } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = useCustomer();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  if (isLoading) return  <LoadingIcon />

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

      <div className=" rounded-lg ">
          <h2>Recent order Request</h2>
          {(data.user.order_requests && data.user.order_requests?.length>0)
            ?<OrderRequestTable orderRequest={data.user.order_requests} /> 
            :<EmptyState msg={"You don't have any pending request"} />}
      </div>
  
      <div className="p-4">
        <h2> Personal Information </h2>
        <li> {data.user.name} | {data.user.location ? `${data.user.location.zone} ${data.user.location.room_number}` : "Not assigned"} | {data.user.department && data.user.department.name}</li>
      </div>
      </>




  )
}

