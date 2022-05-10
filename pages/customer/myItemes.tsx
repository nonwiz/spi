import CreateOrderReq from "@/components/customer/createOrderReqModal";
import FormCreateOrderRequest from "@/components/customer/createOrderRequest";
import OrderRequestTable from "@/components/customer/tables/OrderRequestTable";
import ItemListTable from "@/components/customer/tables/ItemListTable";


import { fetcher, getFieldsValues, useCustomer, useInfo } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";
import { useSWRConfig } from "swr";

export default function MyItems() {
  const { mutate } = useSWRConfig()
  const { data, isLoading } = useCustomer();
  const { data: info, isLoading: infoLoading } = useInfo();
  const [visible, setVisible] = useState(false);
  const [ fLocations, setLocations ] = useState([])
  const [type, setType] = useState("none");
  if (isLoading || infoLoading) return  <LoadingIcon />

  console.log("my items", data.user.location)



  const handleMovingItems = async e => {
    e.preventDefault();
    const formData = getFieldsValues(event, ["item_id", "target_location_id"])
    console.log({ formData });

    fetcher("/api/customer/relocate/request", formData).then((d) => {
      console.log(d)
      mutate("/api/customer")
    })
 
  }
  
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

    <hr />

      <form onSubmit={handleMovingItems}>

        <select name="item_id">
        {data.user.location.items.map((item, index) => 
        <option key={index} value={item.id}>{item.name}</option>)}
          </select>
    
    <select onChange={e => {
      console.log(e, fLocations)
      setLocations(info.locations.filter(loc => loc.building == e.target.value))      }
    }>
      <option> Pick building </option>
      {info.buildings.map((item, index) => <option key={index}>{item}</option>)}
    </select>
    
    <select name="target_location_id">
      <option> Select room </option>
      {fLocations.map((item, index) => <option key={index} value={item.id}>{item.room_number}</option>)}
    </select>

   <div className="my-8 flex flex-row gap-6 w-full">
         <button className="primary-btn" type="submit"> Create Moving Request</button>
      </div>
     

              </form>



      <div className=" rounded-lg ">
          <h2>List of item within {data.user.location.short_code}</h2>
          {(data.user.location?.items && data.user.location?.items?.length>0)
            ?<ItemListTable items={data.user.location.items}/>
            :<EmptyState msg={"You don't have any items"} />}
      </div>
      </>




  )
}

