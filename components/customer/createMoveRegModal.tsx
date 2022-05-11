
import { Modal, Button, Text, Input, Radio, Spacer, Textarea, Collapse } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher, createLog, useInfo } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";



export default function CreateMoveRegModal({visible, closeHandler, info, items }) {
    const { mutate } = useSWRConfig()
    const [ fLocations, setLocations ] = useState([])

    const handleMovingItems = async e => {
      e.preventDefault();
      const formData = getFieldsValues(event, ["item_id", "target_location_id"])
      
  
      fetcher("/api/customer/relocate/request", formData).then((d) => {
        
        mutate("/api/customer")
      })
      closeHandler()
   
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
          <Text id="modal-title" size={18} className="font-semibold">Creating Moving Request</Text>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleMovingItems} className="flex flex-col gap-4">
                <div>
                    <p className="text-primary-color text-lg">Moving Request:  </p>
                    <span >A request made to change the location of an item</span>
                </div>

            <div className="flex flex-col gap-4 mt-4">
                <div className="w-full">
                  <label htmlFor="item_id" className="  text-primary-color text-md font-normal">1. Item: </label>
                  <select required  name="item_id" className="w-full mt-2 form-select appearance-none block p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                  focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="department selection">
                      <option> Select Item </option>
                      {items?.map((item, index) => 
                        <option key={index} value={item.id}>{item.name}</option>)}
                  </select>

                </div>

              <div>
              <label htmlFor="target_location_id" className="  text-primary-color text-md font-normal">2. Building and Room: </label>
              <div className="flex flex-row gap-4">
                <select required   className="w-full mt-2 form-select appearance-none block p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                  focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="department selection" 
                  onChange={e => {setLocations(info.locations.filter(loc => loc.building == e.target.value))      }
                  }>
                      <option> Select Building </option>
                      {info.buildings.map((item, index) => <option key={index}>{item}</option>)}
                  </select>

                  <select required  name="target_location_id" className="w-full mt-2 form-select appearance-none block p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                  focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="department selection">
                      <option> Select Room </option>
                      {fLocations.map((item, index) => <option key={index} value={item.id}>{item.room_number}</option>)}
                  </select>

              </div>
              </div>
            </div>
                        <div className="flex justify-end">
                        {/* <Button auto flat  onClick={closeHandler} className="text-error-color " >Close</Button> */}
                        <button className="primary-btn" type="submit">Create Request</button>
                        </div>


           
          </form>

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
