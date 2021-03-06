import CreateOrderReq from "@/components/customer/createOrderReqModal";
import FormCreateOrderRequest from "@/components/customer/createOrderRequest";
import OrderRequestTable from "@/components/customer/tables/OrderRequestTable";
import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";

import { useCustomer } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function OrderRequest() {
  const { data: session } = useSession();
  const { data, isLoading } = useCustomer();
  const { data: info, isLoading: infoLoading } = useCustomer();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  if (isLoading || infoLoading) return  <LoadingIcon />


   const pendingOrderRequests = data?.user?.location?.order_requests.filter(oreq => oreq.order_status != "Purchased") 
  
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
        locations={info?.locations}
          quantity_unit={info?.quantity_unit}
     
         />
      <div className="my-8 flex flex-row gap-6 w-full">
        <button onClick={createOrder} className="primary-btn"> Recent Order Request</button>
      </div>

      <div className=" rounded-lg ">
          <h2>Pending order Request</h2>
          {(pendingOrderRequests?.length>0)
            ?<OrderRequestTable orderRequest={pendingOrderRequests} /> 
            :<EmptyState msg={"You don't have any pending request"} />}
      </div>
      </>




  )
}

