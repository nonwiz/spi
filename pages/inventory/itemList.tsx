import Layout from "@/components/layout"
import FormAddInventory from "@/components/inventory/addItem"
import { useInventory, useInfo, fetcher, getFieldsValues, createLog, convertToCSV, returnValue } from "lib/fetcher"
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
import ImportItemsModal from "@/components/inventory/ImportItemsModal"


export default function Page() {
  const { data, isLoading } = useInventory()
  const { data: info, isLoading:infoLoading } = useInfo()
  const [addItem, setAddItem] = useState(false);
  const [ImportItem, setImportItem] = useState(false);
  const { mutate } = useSWRConfig();

  if (isLoading || infoLoading) return  <LoadingIcon />

  
  const handlerAdd = () => {setAddItem(true);}
  const closeAdd = () => {setAddItem(false);};

  const handlerImport = () => {setImportItem(true);}
  const closeImport = () => {setImportItem(false);};

  const exportItems = () => {
    const ele = document.createElement("a");
    const items = data.items.map(item => ({...item, location: returnValue(data.locations, "id", item.location_id, "short_code")}))
    let d = convertToCSV([[...Object.getOwnPropertyNames(data.items[0]), "location"], ...items]);

    const file = new Blob([d], {type:"text/csv"});
    ele.href = URL.createObjectURL(file);
    ele.download = `${new Date().toISOString()}-all-items.csv`
    document.body.appendChild(ele);
    ele.click()
  }


  return (
    <>

    <AddItemModal
        visible={addItem}
        closeHandler={closeImport}
        locations={info?.locations}
        buildings={info?.buildings}
        order_type={info?.order_type}
        quantity_unit={info?.quantity_unit}
      />

    <ImportItemsModal
        visible={ImportItem}
        closeHandler={closeAdd}
      />




        <div className="flex flex-row gap-12 my-6 items-center ">
          <div className="flex flex-row gap-4  w-full">
            <div><button onClick={handlerAdd} className="primary-btn">Add New Item</button></div>
            
            <SearchBox msg={"search for items"}/>
            <div className="hidden md:flex md:flex-row gap-4 ">
              <button onClick={handlerImport} className="secondary-btn">Import Items</button>
              <button onClick={exportItems} className="secondary-btn">Export Items</button>
            </div>
          </div>
         

      </div>
        <div className="mt-4">
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



// order status: 