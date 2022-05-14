import CreateOrderReq from "@/components/customer/createOrderReqModal";
import FormCreateOrderRequest from "@/components/customer/createOrderRequest";
import OrderRequestTable from "@/components/customer/tables/OrderRequestTable";
import ItemListTable from "@/components/customer/tables/ItemListTable";


import { fetcher, getFieldsValues, useCustomer, useInfo } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useEffect, useState  } from "react";
import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";
import { useSWRConfig } from "swr";
import CreateMoveRegModal from "@/components/customer/createMoveRegModal";

export default function MyItems() {
  const { mutate } = useSWRConfig()
  const { data, isLoading } = useCustomer();
  const { data: info, isLoading: infoLoading } = useInfo();
  const [visible, setVisible] = useState(false);
  const [ fLocations, setLocations ] = useState([])
  const [type, setType] = useState("none");
  if (isLoading || infoLoading) return  <LoadingIcon />




  const handleMovingItems = async e => {
    e.preventDefault();
    const formData = getFieldsValues(event, ["item_id", "target_location_id"])
    

    fetcher("/api/customer/relocate/request", formData).then((d) => {
      
      mutate("/api/customer")
    })
  }
  
  const handle = () =>{
    setVisible(true);
  }


  const closeHandler = () => {
    setVisible(false);
  };

  return (
      <>
    
        <CreateMoveRegModal 
          visible={visible} 
          closeHandler={closeHandler} 
          info={info}
          items={data?.user?.location?.items}
          />

    

   <div className="my-8 flex flex-row gap-6 w-full">
         <button onClick={handle} className="primary-btn" type="button"> Create Moving Request</button>
      </div>


      <div className=" rounded-lg ">
          <h2>List of item within {data.user.location.short_code}</h2>
          {(data.user.location?.items && data.user.location?.items?.length>0)
            ?<ItemListTable items={data.user.location.items}/>
            :<EmptyState msg={"You don't have any items"} />}
      </div>
      </>




  )
}

