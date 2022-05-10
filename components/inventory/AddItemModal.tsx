
import { Modal, Button, Text, Input, Radio, Spacer, Textarea } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher, createLog, useInfo } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";


export default function AddItemModal({visible, closeHandler, locations, buildings,order_type,quantity_unit, }) {
    const { mutate } = useSWRConfig()

  const allBuilding = Array.from(new Set(locations?.map(item => item?.building)))
  const [building, setBuilding] = useState(allBuilding[0])
  const [locationOptions, setLocation] = useState(locations)
  const [step, setStep] = useState(1);


  const handleAddInventory = async (event) => {
    event.preventDefault()
    console.log("Handle add inventory called")
    const formData = getFieldsValues(event, ["code", "type", "name", "location_id", "description", "price", "order_date", "depreciation", "quantity", "quantity_unit"])
    console.log({ formData });

    fetcher("/api/inventory/addItem", formData).then((d) => {
      console.log(d)
      mutate("/api/inventory")
    })
    createLog("Item", `Add: new item (${formData.name}-${formData.type}-${formData.order_date}) to the inventory`, "Create")
    closeHandler()
}

  useEffect(() => {
    console.log("change building")
    const filterLocations = locations?.filter(loc => loc?.building == building)
    setLocation(filterLocations);
  }, [building])

  

  return (
    <>
      <Modal
        closeButton

        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="800px"
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>Add New Item</Text>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddInventory} className="flex flex-col gap-4">
            <div className=" flex flex-col">
                    <label htmlFor="location" className="  text-primary-color text-md font-normal">1. Location Details: </label>
                    <span className="font-normal font-sm pl-[12px] text-sm">Building and room where the item is located</span>
                    <div className="flex flex-row gap-4 mt-2">
                        <select  required className=" form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                        focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="location selection" aria-labelledby="location selection" onChange={e => setBuilding(e.target.value)}>
                        <option>Select Building </option>
                            {buildings?.map((building, num) => 
                                <option key={num} value={building} >{building}</option>)}
                    
                        </select>

                        <select required  name="location_id" className=" form-select appearance-none block w-1/2 p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                        focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="department selection">
                        <option> Select Room </option>
                            {locationOptions?.map((location, num) => 
                                <option key={num} value={location.id} >{location.room_number}</option>)}
                        </select>
                    </div>
                    </div>
                
            <div className="flex flex-row gap-4">
                <div className="w-full">
                <label htmlFor="location" className="  text-primary-color text-md font-normal">2. Category: </label>
                <select required  name="type" className="w-full mt-2 form-select appearance-none block p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="department selection">
                    <option> Select type / category </option>
                    {order_type?.map((ot, num) => 
                        <option key={num} >{ot}</option>)}
                </select>

                </div>
                    <Input  bordered fullWidth
                        label="3. Name"
                        color="primary" size="lg"
                        type="text" name="name" placeholder="Item Name"
                    />
            </div>


            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-row gap-4 w-full">
                    <Input  bordered fullWidth
                        label="4. Item Code"
                        color="primary" size="lg"
                        type="text" name="code" placeholder="Item Code"
                    />
                    <Input  bordered fullWidth
                        label="5. Order date"
                        color="primary" size="lg"
                        type="date" name="order_date"
                    />
                    <Input  bordered fullWidth
                        label="6. Depreciation date"
                        color="primary" size="lg"
                        type="date" name="depreciation"
                    />
                </div>

              
                <div className="flex flex-row gap-4 w-full items-center">
                    <Input  bordered fullWidth
                        label="7. Price"
                        color="primary" size="lg"
                        type="number" step="0.01" name="price" placeholder="Item price"
                    />
                    <div>
                    <label htmlFor="location" className="text-primary-color text-md font-normal">8. Quantity Unit: </label>
                    <select   name="quantity_unit" className=" mt-1 form-select appearance-none block  p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="department selection">
                        <option> Select quantity unit </option>
                            {quantity_unit?.map((unit, num) => 
                                <option key={num}>{unit}</option>)}
                        </select>
                    </div>
                    

                    <Input  bordered fullWidth
                        label="9. Quantity"
                        color="primary" size="lg"
                        type="number" step="0.01" name="quantity" placeholder="Item Quantity"
                    />
                </div>

                
                    <div className="flex flex-row gap-2 items-center">

                        <Textarea bordered fullWidth
                            color="primary"
                            name="description"
                            label="10. Description"
                            placeholder="item description"
                            className="font-normal w-2/3"
                            />
                            <div className="w-1/3">

                                 <button className="primary-btn" type="submit" value="Add">Add Item</button>
                            </div>

                    </div>
                      
                    </div>
          </form>

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
