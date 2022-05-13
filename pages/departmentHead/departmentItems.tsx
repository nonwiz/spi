import CreateOrderReq from "@/components/customer/createOrderReqModal";
import FormCreateOrderRequest from "@/components/customer/createOrderRequest";
import OrderRequestTable from "@/components/customer/tables/OrderRequestTable";
import ItemListTable from "@/components/customer/tables/ItemListTable";


import {  useDepartmentHead } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LoadingIcon from "@/components/loadingIcon";
import { EmptyState } from "@/components/EmptyState";

export default function DepartmentItems() {
  const { data: session } = useSession();
  const { data, isLoading } = useDepartmentHead();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  if (isLoading) return  <LoadingIcon />
  const createOrder = () =>{
    setVisible(true);
  }


  const closeHandler = () => {
    setVisible(false);
  };

  const items = data?.department_detail?.locations.map((loc: { items: any; }) => loc.items).flat()
  console.log({items, data})


  return (
      <>
       <div className="my-8 flex flex-row gap-6 w-full">
        <button className="primary-btn"> Create Moving Request</button> 
      </div>

      <div className="">
        <div className=" rounded-lg ">
            <h2>Department Items</h2>
            {items ? <ItemListTable items={items} />
            : <EmptyState msg={"No items in department"} />} 

            </div>
      </div>
      </>
   )
}
