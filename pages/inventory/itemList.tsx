import Layout from "@/components/layout"
import FormAddInventory from "@/components/inventory/addItem"
import { useInventory, useInfo } from "lib/fetcher"
import { useSession } from "next-auth/react"
import { useState } from "react"
import FormMoveUser from "@/components/inventory/moveUser"
import StatsCardsInventory from "@/components/inventory/StatsCardsInventory"
import { EmptyState } from "@/components/EmptyState"
import ItemsListTable from "@/components/inventory/tables/ItemsListTable"
import LoadingIcon from "@/components/loadingIcon"
import SearchBox from "@/components/admin/SearchBox"
import AddItemModal from "@/components/inventory/AddItemModal"

export default function Page() {
  const { data, isLoading } = useInventory()
  const { data: info, isLoading:infoLoading } = useInfo()
  const [sLocation, setSelectedL] = useState(0)
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");

  if (isLoading || infoLoading) return  <LoadingIcon />

  console.log("sata",{ data })

  const returnLocationItems = (location) => {
    console.log(location.items)
    console.log("Return items within location", location);
    const items = location.items.map(item =>
      <li>{item.name}</li>);
    return items.length > 0 ? items : "No items within this location!";
  }
  const handler = () => {setVisible(true);}
  const closeHandler = () => {setVisible(false);};

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

