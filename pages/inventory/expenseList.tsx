import Layout from "@/components/layout"
import FormAddInventory from "@/components/inventory/addItem"
import { useInventory, useInfo, fetcher, getFieldsValues, createLog, convertToCSV, returnValue, exportItems } from "lib/fetcher"
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
  const [codeFilter, setCodeFilter] = useState("")
  
  const handlerAdd = () => {setAddItem(true);}
  const closeAdd = () => {setAddItem(false);};

  const handlerImport = () => {setImportItem(true);}
  const closeImport = () => {setImportItem(false);};


  const changeFilter = (type) =>{
    setCodeFilter(type)
  }


  if (isLoading || infoLoading) return  <LoadingIcon />

  const items = data?.items.filter(item => !item.isAsset)

  return (
    <>

    <AddItemModal
        visible={addItem}
        closeHandler={closeAdd}
        locations={info?.locations}
        buildings={info?.buildings}
        order_type={info?.order_type}
        quantity_unit={info?.quantity_unit}
      />

    <ImportItemsModal
        visible={ImportItem}
        closeHandler={closeImport}
        type={"item"}
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
          <div className="flex flew-row gap-8">
          <h2>Recently Added item (Non-Asset)</h2>
          {/* <div className=" flex flex-row gap-2 items-center">
              <p className="text-lg font-semibold">Filter By: </p>
              <button  onClick={(e) => changeFilter("")}  className={(codeFilter =="")?" filterSelect bg-primary-color text-white":"filterSelect"}>Show All</button>
              <button  onClick={(e) => changeFilter("Location")}  className={(codeFilter =="Location")?" filterSelect bg-primary-color text-white":"filterSelect"}>Location</button>
              <button  onClick={(e) => changeFilter("Department")}  className={(codeFilter =="Department")?" filterSelect bg-primary-color text-white":"filterSelect"}>Department</button>
              <button  onClick={(e) => changeFilter("Employee")}  className={(codeFilter =="Employee")?" filterSelect bg-primary-color text-white":"filterSelect"}>Employee</button>

 
            </div> */}
          </div>
        

        {(items && items?.length >0)
          ?
            <ItemsListTable items={items} locations={data.locations} />
          :
            <EmptyState msg={"The Inventory is empty"} />}
        </div>
      </div>
 
    </>
  )
}



// order status: 