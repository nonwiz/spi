import Layout from "@/components/layout"
import FormAddInventory from "@/components/inventory/addItem"
import { useInventory, useInfo, fetcher, getFieldsValues, createLog, convertToCSV, convertToJson, processFile, exportCodes } from "lib/fetcher"

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
import AddCodeNameModal from "@/components/inventory/AddCodeNameModal"
import CodeListTable from "@/components/customer/tables/CodeListTable"
import ImportItemsModal from "@/components/inventory/ImportItemsModal"


export default function Page() {
  const { data, isLoading } = useInventory()
  const { data: info, isLoading:infoLoading } = useInfo()
  const [visible, setVisible] = useState(false);
  const [ImportItem, setImportItem] = useState(false);
  const [codeFilter, setCodeFilter] = useState("")
  const [csv, setCSV] = useState("")


  const handler = () => {setVisible(true);}
  const closeHandler = () => {setVisible(false);};

  const handlerImport = () => {setImportItem(true);}
  const closeImport = () => {setImportItem(false);};

 
  
  const changeFilter = (type) =>{
    setCodeFilter(type)
  }
  console.log("hello world", codeFilter)

  if (isLoading || infoLoading) return  <LoadingIcon />

  return (
    <>

    <AddCodeNameModal
        visible={visible}
        closeHandler={closeHandler}
        code_list={data?.code_list}
        code_types={data?.code_types}
      />

    <ImportItemsModal
        visible={ImportItem}
        closeHandler={closeImport}
        type="codeList"
      />


        <div className="flex flex-row gap-12 my-6 items-center ">
        <button onClick={handler} className="primary-btn">Add New</button>
          <SearchBox msg={"search for items"}/>
            
            <div className="hidden md:flex md:flex-row gap-4 ">
              <button onClick={handlerImport} className="secondary-btn">Import Items</button>
              <button onClick={exportCodes} className="secondary-btn">Export Items</button>
            </div>
        </div>
        <div className="mt-4">
        <div className="flex flew-row gap-8">
          <h2>Location & Department Code List </h2>
          <div className=" flex flex-row gap-2 items-center">
              <p className="text-lg font-semibold">Filter By: </p>
              <button  onClick={(e) => changeFilter("")}  className={(codeFilter =="")?" filterSelect bg-primary-color text-white":"filterSelect"}>Show All</button>
              <button  onClick={(e) => changeFilter("Location")}  className={(codeFilter =="Location")?" filterSelect bg-primary-color text-white":"filterSelect"}>Location</button>
              <button  onClick={(e) => changeFilter("Department")}  className={(codeFilter =="Department")?" filterSelect bg-primary-color text-white":"filterSelect"}>Department</button>
              <button  onClick={(e) => changeFilter("Employee")}  className={(codeFilter =="Employee")?" filterSelect bg-primary-color text-white":"filterSelect"}>Employee</button>

 
            </div>
        </div>

        
        {data?.code_list?.length >0?
          <CodeListTable codes={data?.code_list?.filter(code => codeFilter ? code.codeType == codeFilter : true)} />
        :<EmptyState msg={"The Inventory is empty"} />}

        
    
      </div>
 
    </>
  )
}

