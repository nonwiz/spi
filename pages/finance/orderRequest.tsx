import CreateOrderReq from "@/components/customer/createOrderReqModal";
import FormCreateOrderRequest from "@/components/customer/createOrderRequest";
import OrderRequestTable from "@/components/customer/tables/OrderRequestTable";
import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";
import PendingRequestTable from "@/components/purchase/table/PendingRequestTable";

import { useFinance, usePurchase } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function OrderRequest() {
  const { data: session } = useSession();
  const { data, isLoading } = useFinance();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");

  if (isLoading) return  <LoadingIcon />

  // Check if there is someone approved yet / someone who approved refer to the dean usually.
  const pendingOrderRequests = data.orderRequests.filter(oreq => oreq.order_status == "Pending" && oreq.approval_by.length > 0)

  
  
  const createOrder = () =>{
    setVisible(true);
  }


  const closeHandler = () => {
    setVisible(false);
  };

  return (
      <>
      {/* <CreateOrderReq
          type={type}
          visible={visible} 
          closeHandler={closeHandler} 
          orderTypes={data.orderTypes} 
          /> */}
      {/* <div className="my-8 flex flex-row gap-6 w-full">
        <button onClick={createOrder} className="primary-btn"> Create Order Request</button>
      </div> */}

      <div className="">
        <div className=" rounded-lg ">
            <h2>Recent order Request</h2>

            {(data.orderRequests.length>0)? 
              <PendingRequestTable orderRequest={pendingOrderRequests} email={data.user.email} pageType={"finance"} />:
              <EmptyState msg={"No Pending Order Request"} />}
        </div>
      </div>


      </>




  )
}

