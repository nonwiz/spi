import Layout from "@/components/layout"
import FormAddInventory from "@/components/inventory/addItem"
import { useInventory, useInfo, fetcher, getFieldsValues, createLog, convertToCSV } from "lib/fetcher"
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

  const processFile = e => {
    console.log(e);
    const input = document.querySelector("#data");
    const inputFile = document.querySelector("#inputFile");
    const file = inputFile.files[0];
    console.log(inputFile, file)
      if (!file) return;
      const reader = new FileReader();
        reader.onload = (e) => {
          // e.target points to the reader
          const textContent = e.target.result;
          let temp = textContent.split("\n");
          let arr = [];
          temp.forEach((item) => {
            arr.push(item.split(",").map((i) => i.replaceAll('"', "")));
          });
          let formatted = "";
          arr.forEach((item) => {
            if (item[0] == "") return;
            item.forEach((i) => {
              formatted += `${i}\t`;
            });
            formatted += `\t\n`;
          });
          input.value = formatted;
        };
        reader.onerror = (e) => {
          const error = e.target.error;
          console.error(`Error occured while reading ${file.name}`, error);
        };
        reader.readAsText(file);
  }


const returnValue = (list, key, value, prop) => {
    // Take the parent object's key comparre with the value, if true, return the prop
    console.log(value);
    return list.find(item => item[key] == value)[prop];
  }

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
    // const ele = document.createElement("a");
    // let d = convertToCSV([[...Object.getOwnPropertyNames(data.items[0]), "location"], ...items]);

    // const file = new Blob([d], {type:"text/csv"});
    // ele.href = URL.createObjectURL(file);
    // ele.download = `${new Date().toISOString()}-all-items.csv`
    // document.body.appendChild(ele);
    // ele.click()
  }

  const convertToJson = (data) => {
    const input_list= data.split("\n").filter(item => item.length > 4).map(item => item.split("\t"));
    // input_list.forEach(item => item.shift())
    const props = input_list.shift();
    const formated = []
    console.log({input_list, props})
    input_list.forEach(row => {
      const tmp = {}
      row.forEach((col, index) => {
        tmp[props[index]] = col == "null" ? null : col;
      })
      formated.push(tmp)
    })
    console.log(formated);
    return formated;

  }

  

  const handleImportItems = async () => {
    const input = document.querySelector("#data").value;
    const json_input = convertToJson(input);
    const items = json_input.map(item => ({...item, location_id: returnValue(data.locations, "short_code", item.location, "id")}))
    const fInput = JSON.stringify(items);
    console.log({items, fInput, input, json_input, items})

    fetcher("/api/inventory/importItems", {"items": fInput}).then(d => {
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
              <p className="text-lg font-semibold">Filters: </p>
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
        <h2> Import Items </h2>
           <h1 className="bg-stone-300 w-20 text-center">Input</h1>
      <textarea id="data" rows={10}  className="hidden" name="items" />
      <br />
    <input type="file" id="inputFile" onChange={processFile} className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-200" />
          <button onClick={() => handleImportItems()}> Import </button>
        <hr />
        <h2> Export Data </h2>
        <button onClick={exportItems}> Retrieve all items </button>
        </div>
        <div className="border border-2 m-1 p-1">
          <h2> Code Name </h2>
          <button onClick={exportCodes}> Export Code Name </button>
          </div>

      </div>
 
    </>
  )
}

