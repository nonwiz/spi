import CreateOrderReq from "@/components/customer/createOrderReqModal";
import FormCreateOrderRequest from "@/components/customer/createOrderRequest";
import OrderRequestTable from "@/components/customer/tables/OrderRequestTable";
import ItemListTable from "@/components/customer/tables/ItemListTable";


import { useCustomer, useFinance } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";

export default function MyItems() {
  const { data: session } = useSession();
  const { data, isLoading } = useFinance();
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
       <div className="my-8 flex flex-row gap-6 w-full">
        <button className="primary-btn"> Create Moving Request</button> 
      </div>

      <div className="">
        <div className=" rounded-lg ">
            <h2>List of items</h2>
            {(data.user.location && data.user.location.items) ? 
              <ItemListTable items={data.user.location.items} />:
              <EmptyState msg={"You don't have any items"} />}
            </div>
      </div>
      </>
   )
}
