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

  const checkDepreciation = (item) => {
    let od = new Date(item.order_date);
      let dp;
      let today = new Date();
      if (!item.isAsset) {
        return false
      }
      if (item.depreciation) {
        dp = new Date(item.depreciation)
      } else {
        dp = new Date();
        dp.setFullYear(od.getFullYear() + 10)
      }
      if (dp < today) {
        return true
      } else {
        return false
      }
   
    }
  

export default function Page() {
  const { data, isLoading } = useInventory()
  const { data: info, isLoading:infoLoading } = useInfo()
  const [visible, setVisible] = useState(false);
  const { mutate } = useSWRConfig();
  if (isLoading || infoLoading) return  <LoadingIcon />
  let items = data.items.filter(item => checkDepreciation(item))
  

    const handler = () => {setVisible(true);}
  const closeHandler = () => {setVisible(false);};

  const handleApproveRelocate= async relocate => {
    fetcher("/api/customer/relocate/approve", {relocate_id: relocate.id}).then(d => {
      
      mutate("/api/inventory")
    })
    createLog("LocationMoveRequest", `Moving ${relocate.item?.name} from ${relocate.previous_location} to ${relocate.target_location.short_code}`, "Update")

  }

  console.log({data: data.locations})

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
        {/* <button onClick={handler} className="primary-btn">Add New</button> */}
        <SearchBox msg={"search for Assets"}/>

      </div>
        <div className="mt-4">
        <div className="rounded-lg ">
          <h2>Depreciated Assets </h2>

        {(items.length >0)
          ?
            <ItemsListTable items={items} locations={data.locations} />
          :
            <EmptyState msg={"No depreciated items found"} />}
        </div>
      </div>
 
    </>
  )
}




