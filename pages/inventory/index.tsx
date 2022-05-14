import Layout from "@/components/layout"
import FormAddInventory from "@/components/inventory/addItem"
import { useInventory, useInfo, fetcher, getFieldsValues, createLog } from "lib/fetcher"
import { useSession } from "next-auth/react"
import { useState } from "react"
import FormMoveUser from "@/components/inventory/moveUser"
import StatsCardsInventory from "@/components/inventory/StatsCardsInventory"
import { EmptyState } from "@/components/EmptyState"
import ItemsListTable from "@/components/inventory/tables/ItemsListTable"
import LoadingIcon from "@/components/loadingIcon"
import { Input, Tooltip  } from '@nextui-org/react';
import { useSWRConfig } from "swr";
import AddGeneralInfoModal from "@/components/inventory/AddGenInfoModal"


export default function Page() {
  const { data: session } = useSession()
  const { data, isLoading } = useInventory()
  const { data: info, isLoading: infoLoading } = useInfo()
  const [sLocation, setSelectedL] = useState(0)
  const { mutate } = useSWRConfig();
  const [visible, setVisible] = useState(false);

  if (isLoading || infoLoading) return  <LoadingIcon />

 

 
  const createGeneralInfo = () =>{
    setVisible(true);
  }
  const closeHandler = () => {
    setVisible(false);
  };


  return (
    <>
        <AddGeneralInfoModal
          visible={visible} 
          closeHandler={closeHandler} 
          info={info}
          />
        <StatsCardsInventory items={data.items} />

   
          
          <Tooltip content={"order types, and quantity units"} placement="right" className="mt-6 mb-4">
            <button onClick={createGeneralInfo} className="primary-btn"> Add General Information</button>
        </Tooltip>
     

        <div className="">
        <div className="rounded-lg ">
        

          <h2>Recently Added item </h2>

        {(data.items && data.items?.length >0)
          ?
            <ItemsListTable items={data.items} locations={data.locations} />
          :
            <EmptyState msg={"The Inventory is empty"} />}
        </div>
      </div>


    </>
  )
}
