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
import SearchBox from "@/components/admin/SearchBox"
import AddItemModal from "@/components/inventory/AddItemModal"
import { useSWRConfig } from "swr"

export default function Page() {
  const { data, isLoading } = useInventory()
  const { data: info, isLoading:infoLoading } = useInfo()
  const [visible, setVisible] = useState(false);
  const { mutate } = useSWRConfig();

  if (isLoading || infoLoading) return  <LoadingIcon />

  

  
  const handler = () => {setVisible(true);}
  const closeHandler = () => {setVisible(false);};

  const handleApproveRelocate= async relocate => {
    fetcher("/api/customer/relocate/approve", {relocate_id: relocate.id}).then(d => {
      
      mutate("/api/inventory")
    })
    createLog("LocationMoveRequest", `Moving ${relocate.item.name} from ${relocate.previous_location} to ${relocate.target_location.short_code}`, "Update")

  }

  return (
    <>

    <AddItemModal
        visible={visible}
        closeHandler={closeHandler}
        locations={info?.locations}
        buildings={info?.buildings}
        order_type={info?.order_type}
        quantity_unit={info?.quantity_unit}
      />
        <div className="flex flex-row gap-12 my-6 items-center ">
        <button onClick={handler} className="flex py-2 px-4 text-sm rounded-lg border border-primary-color gap-x-2.5 bg-primary-color text-white hover:shadow-lg hover:shadow-blue-700/20">Add New</button>
        <SearchBox msg={"search for items"}/>

      </div>
        <div className="mt-4">
        <div className="rounded-lg ">
          <h2>Recently Added item </h2>
          <hr />
          <p> List of relocating item request </p>
          {data.relocate_requests.map((re, index) => 
            <li key={index}> {re.item.name} from {re.previous_location} to {re.target_location.short_code} | <button onClick={() => handleApproveRelocate(re)}> Accept </button> </li>
          )}

          {/* <FormAddInventory locations={info.locations}  /> */}
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

