import { getFieldsValues, fetcher, useInfo, createLog } from "lib/fetcher"
import { useSWRConfig } from "swr"
import { Input, Text  } from '@nextui-org/react';
import { useEffect, useState } from "react";

const FormAddInventory = ({locations}: {locations: string[]}) => {
  const { mutate } = useSWRConfig()
  const { data: info, isLoading: infoLoading } = useInfo();

  if (infoLoading) {
    return "..."
  }


  const allBuilding = Array.from(new Set(locations?.map(item => item?.building)))
  const [building, setBuilding] = useState(allBuilding[0])
  const [locationOptions, setLocation] = useState(locations)


  const handleAddInventory = async (event) => {
    event.preventDefault()
    console.log("Handle add inventory called")
    const formData = getFieldsValues(event, ["code", "type", "name", "location_id", "description", "price", "order_date", "depreciation", "quantity", "quantity_unit"])
    console.log({ formData });

    fetcher("/api/inventory/addItem", formData).then((d) => {
      console.log(d)
      mutate("/api/inventory")
    })
    createLog("Item", "Add: ")
  }

  useEffect(() => {
    console.log("change building")
    const filterLocations = locations?.filter(loc => loc?.building == building)
    setLocation(filterLocations);
  }, [building])



  return (
    <>
      <form onSubmit={handleAddInventory}>
        <div>
              <label htmlFor="location" className="mt-4 mb-2 text-gray-500 text-sm">Location</label>
              <div className="flex flex-row gap-4">

                <select  required className=" form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="location selection" aria-labelledby="location selection" onChange={e => setBuilding(e.target.value)}>
                  <option>Select Building </option>
                    {info.buildings?.map((building, num) => 
                        <option key={num} value={building} >{building}</option>)}
            
                </select>

                <select   name="location_id" className=" form-select appearance-none block w-1/2 p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="department selection">
                  <option> Select Room </option>
                    {locationOptions?.map((location, num) => 
                        <option key={num} value={location.id} >{location.room_number}</option>)}
                </select>
                </div>

                <select   name="type" className=" form-select appearance-none block w-1/2 p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="department selection">
                  <option> Select type / category </option>
                    {info?.order_type?.map((ot, num) => 
                        <option key={num} >{ot}</option>)}
                </select>
 

  </div>

        <label> Code </label>
        <input type="text" name="code" placeholder="Item Code" />

        <label> Name </label>
        <input type="text" name="name" placeholder="Item Name" />

        <label> Order date </label>
        <input type="date" name="order_date" />

        <label> Depreciation date *optional</label>
        <input type="date" name="depreciation" />

        <input type="number" step="0.01" name="price" placeholder="Item price" />
        <input type="number" step="0.01" name="quantity" placeholder="Item Quantity" />
                <select   name="quantity_unit" className=" form-select appearance-none block w-1/2 p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="department selection">
                  <option> Select Room </option>
                    {info.quantity_unit?.map((unit, num) => 
                        <option key={num}>{unit}</option>)}
                </select>
 
        <textarea name="description" placeholder="item description" />

        <input
          type="submit"
          value="Add"
          className="p-2 border-2 border-solid m-2"
        />
      </form>
    </>
  )
}

export default FormAddInventory
