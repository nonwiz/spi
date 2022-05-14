import Layout from "@/components/layout"
import FormAddInventory from "@/components/inventory/addItem"
import { useInventory, useInfo, fetcher, getFieldsValues, createLog, convertToCSV, convertToJson, processFile } from "lib/fetcher"

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


export default function Page() {
  const { data, isLoading } = useInventory()
  const { data: info, isLoading:infoLoading } = useInfo()
  const [visible, setVisible] = useState(false);
  const { mutate } = useSWRConfig();

  const [csv, setCSV] = useState("")

  if (isLoading || infoLoading) return  <LoadingIcon />

  
  const handler = () => {setVisible(true);}
  const closeHandler = () => {setVisible(false);};
  console.log({csv})

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

  
  const exportCodes= () => {
    const ele = document.createElement("a");
    let items = data.code_list;
    let d = convertToCSV([[...Object.getOwnPropertyNames(data.code_list[0])], ...items]);
    const file = new Blob([d], {type:"text/csv"});
    ele.href = URL.createObjectURL(file);
    ele.download = `${new Date().toISOString()}-all-codes.csv`
    document.body.appendChild(ele);
    ele.click()
  }

  const handleImportCodes = async () => {
    const input = document.querySelector("#codes").value;
    const json_input = convertToJson(input);
    const items = json_input.map(item => ({...item}))
    const fInput = JSON.stringify(items);

    fetcher("/api/common/code_name/importCodes", {"items": fInput}).then(d => {
      console.log(d);
    })
  }

  return (
    <>

    <AddCodeNameModal
        visible={visible}
        closeHandler={closeHandler}
        code_list={data?.code_list}
        code_types={data?.code_types}
      />
        <div className="flex flex-row gap-12 my-6 items-center ">
        <button onClick={handler} className="primary-btn">Add New</button>
        {/* <button onClick={handler} className="primary-btn">Import Items</button> */}
          <SearchBox msg={"search for items"}/>
            <div className=" flex flex-row gap-2 items-center">
              <p className="text-lg font-semibold">Filters By: </p>
              <button  className="secondary-btn">Location</button>
              <button  className="secondary-btn">Department</button>
              <button  className="secondary-btn">Employee</button>

            </div>
        </div>
        <div className="mt-4">
        <div className="rounded-lg ">
          <h2>Location & Department Code List </h2>
        </div>

        <CodeListTable codes={data?.code_list} />
       <div className="border border-2 m-1 p-1"> 
        {/* <h2> Import Items </h2>
           <h1 className="bg-stone-300 w-20 text-center">Input</h1>
      <textarea id="data" rows={10}  className="hidden" name="items" />

    <input type="file" id="inputFile" onChange={(e) => processFile(e, "#data", "#inputFile")} className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-200" />
          <button onClick={() => handleImportItems()}> Import </button>
        <hr /> */}






        <h2> Export Data </h2>
        <button onClick={exportItems}> Retrieve all items </button>
        </div>
        <div className="border border-2 m-1 p-1">
          <h2> Code Name </h2>
          <button onClick={exportCodes}> Export Code Name </button>
   <br />

      <textarea id="codes" rows={10}  className="hidden" name="codes" />

    <input type="file" id="inputCodes" onChange={e => processFile(e, "#codes", "#inputCodes")} className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-200" />
          <button onClick={() => handleImportCodes()}> Import </button>
        <hr />
    
          </div>

      </div>
 
    </>
  )
}

