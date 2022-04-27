import CreateOrderReq from "@/components/customer/createOrderReqModal";
import FormCreateOrderRequest from "@/components/customer/createOrderRequest";
import OrderRequestTable from "@/components/customer/tables/OrderRequestTable";
import ItemListTable from "@/components/customer/tables/ItemListTable";


import { useCustomer } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function MyItems() {
  const { data: session } = useSession();
  const { data, isLoading } = useCustomer();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  if (isLoading) return <p> Loading ... </p>

  
  
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
        <button className="primary-btn"> Create Moving Request</button>
      </div>

      <div className="">
        <div className=" rounded-lg ">
            <h2>List of items</h2>
            {console.table(data.user.location)}
             {data.user.location && data.user.location.items && <ItemListTable items={data.user.location.items} />} 
        </div>
      </div>

      </>




  )
}

