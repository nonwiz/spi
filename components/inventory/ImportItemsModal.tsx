
import { Modal, Button, Text, Input, Radio, Spacer, Textarea, Collapse } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher, createLog, useInfo, convertToJson, processFile } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";


export default function ImportItemsModal({visible, closeHandler }) {
    const { mutate } = useSWRConfig()

    
    
  
  
  const returnValue = (list, key, value, prop) => {
      // Take the parent object's key comparre with the value, if true, return the prop
      console.log(value);
      return list.find(item => item[key] == value)[prop];
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
      <Modal
        closeButton

        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="500px"
      >
        <Modal.Header>
          <Text id="modal-title" size={20} className="font-bold">Importing Items</Text>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
                <div className="">
                    <p className="text-primary-color text-lg">Upload CSV File: <span className="text-gray-600 text-md">The file should contain the items to be upload, and in the right format</span> </p>
                    
                </div>
          
               

        <div className="">

            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex flex-col items-center justify-center pt-7">
                       
                        <svg className="w-12 h-12 text-gray-400 group-hover:text-gray-400 fill-current" xmlns="http://www.w3.org/2000/svg " viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 8v12.993A1 1 0 0 1 20.007 22H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8zm-2 1h-5V4H5v16h14V9zM8 7h3v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2z"/></svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Select a file</p>
                    </div>
                    <input type="file" id="inputFile" onChange={(e) => processFile(e, "#data", "#inputFile")} className="opacity-0" />
                    
                </label>
            </div>

            <textarea id="data" rows={10}  className="hidden" name="items" />
        </div>
      
    
      
      <div className="flex justify-center gap-12 ">
            <Button auto flat  onClick={closeHandler} className="text-error-color " >Close</Button>
            <button className="primary-btn" type="submit" onClick={() => handleImportItems()} >Import</button>
      </div>


           
          </div>

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
