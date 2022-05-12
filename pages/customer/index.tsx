import CreateOrderReq from "@/components/customer/createOrderReqModal";
import FormCreateOrderRequest from "@/components/customer/createOrderRequest";
import OrderRequestTable from "@/components/customer/tables/OrderRequestTable";
import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";

import { useCustomer, useInfo } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = useCustomer();
  const { data:info, isLoading:infoLoading } = useInfo();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  const [ office, setOffice ] = useState("")

  if (isLoading || infoLoading) return  <LoadingIcon />
  const pendingOrderRequests = data?.user?.location?.order_requests.filter(oreq => oreq.order_status == "Pending")
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
          orderTypes={info?.order_type} 
          locations={info?.locations}
          quantity_unit={info?.quantity_unit}
          office={office}
          />

      <div className="my-8 flex flex-row gap-6 w-full items-center">
        <h1>Create Order Request: </h1>

        <button onClick={() => {setOffice(""); createOrder()}} className="primary-btn"> For other location</button>
        <button className="primary-btn" onClick={() => {setOffice(data.user.location.id); createOrder()}}>For your office </button>
      </div>

      <div className=" rounded-lg ">
          <h2>Recent order Request</h2>
          {(data?.user?.location?.order_requests && data.user?.location?.order_requests?.length>0)
            ?<OrderRequestTable orderRequest={pendingOrderRequests} /> 
            :<EmptyState msg={"You don't have order requests"}/>}
      </div>
{/*   
      <div className="p-4">
        <h2> Personal Information </h2>
        <li> {data?.user?.name} | {data.user?.location ? `${data?.user?.location.short_code}` : "Not assigned"} | {data?.user?.department && data?.user?.department.name}</li>
      </div> */}
      </>




  )
}

