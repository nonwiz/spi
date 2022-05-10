import CreateOrderReq from "@/components/customer/createOrderReqModal";
import FormCreateOrderRequest from "@/components/customer/createOrderRequest";
import OrderRequestTable from "@/components/customer/tables/OrderRequestTable";
import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";
import PendingRequestTable from "@/components/purchase/table/PendingRequestTable";

import { useDepartmentHead, useInfo } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function OrderRequest() {
  const { data: session } = useSession();
  const { data, isLoading } = useDepartmentHead();
  const { data: info, isLoading: infoLoading } = useInfo();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  if (isLoading) return  <LoadingIcon />

  
  
  const createOrder = () =>{
    setVisible(true);
  }

  const closeHandler = () => {
    setVisible(false);
  };

  const pendingRequests = (order_req: any[]) =>{
    console.log(order_req,"holaaaa") 
    let filtered_req = order_req.filter((item) => item?.location?.department_id == data?.user?.department_id)
    return filtered_req
  }

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
        <button onClick={createOrder} className="primary-btn"> Create Order Request</button>
      </div>

      <div className="">
        <div className=" rounded-lg ">
            <h2>Recent order Request</h2>
            {console.log(data)}
            {(data?.orderRequests.length>0)?
               <PendingRequestTable pageType={"departmentHead"} email={data?.user?.email} orderRequest={pendingRequests(data?.orderRequests)} />:
               <EmptyState msg={"No Pending Order Request"} />}
        </div>
      </div>


      </>




  )
}

