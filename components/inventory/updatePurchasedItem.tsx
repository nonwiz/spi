
import { Modal, Button, Text, Input, Radio, Spacer, Textarea, Collapse } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher, createLog, useInfo } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";
import DateConvert from "../dateConvert";


export default function UpdatePurchasedItem({visible, closeHandler, item, location }) {
    const { mutate } = useSWRConfig()


  const handleImportInventory = async (event) => {
    event.preventDefault()
    const formData = getFieldsValues(event, ["code", "type", "name", "location_id", "description", "price", "order_date", "depreciation", "quantity", "quantity_unit", "order_id"])
    
    console.log({formData})
    fetcher("/api/inventory/transformItem", formData).then((d) => {
      
      mutate("/api/inventory")
    })
    createLog("OrderItem", `Change: convert order_item to item (${formData.name}-${formData.type}-${formData.order_date}) to the inventory`, "Create")
    closeHandler()
}



   const date = <DateConvert date={item?.order_request?.order_date} type="date" />
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
          <Text id="modal-title" size={18} className="font-semibold">Purchased Item Information (Update)</Text>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleImportInventory}>
          <div  className ="flex flex-col gap-4 p-2">
                    
                    <div className="flex flex-col gap-4 ">
                      <input name="order_id" type="hidden" value={item.id} />
                      <Input  bordered fullWidth
                          readOnly
        
                          size="lg"
                          type="text"
                          label="Name" 
 
                          name={"name"}
                          initialValue={item.name}
                          />


                      <div className="flex flew-row gap-4 items-center">
                      
                      <Input  bordered fullWidth
                            readOnly
                            size="lg"
                            type="text"
                            label="Order Date"  
                            name="order_date"
                            initialValue={new Date(item?.order_request?.order_date).toLocaleString('en-us',{dateStyle: 'medium'})}   
                            />

                        <Input  bordered fullWidth
                            required
                            color="primary" 
                            size="lg"
                            type="Date"
                            label="Depreciation Date "  
                            name={`depreciation`}
                            />
                        </div>

                        <div className="flex flew-row gap-4 items-center">
                          <Input  bordered fullWidth
                            readOnly
                            size="lg"
                            type="text"
                            label="Type"  
                            name={`type`}
                            initialValue={item.type}
                            />

                          <Input  bordered fullWidth
                            required
                            status="primary" 
                            color="primary" 
                            size="lg"
                            type="text"
                            label="Asset Code *"  
                            name={`code`}
                            placeholder="Item Code"
                            />
                        </div>

                        <div className="flex flew-row gap-4 items-center">
                        <Input  bordered fullWidth
                          readOnly
                          size="lg"
                          type="number"
                          label={`Quantity (${item.quantity_unit})`} 
                          name={`quantity`}
                          min="1"
                          placeholder="0x"
                          initialValue={item.quantity}
       
                          />
                          <input type="hidden" name="quantity_unit" value={item?.quantity_unit} />

                          <Input  bordered fullWidth
                            readOnly
                            size="lg"
                            type="number"
                            min="1"
                            label="Price (Baht)"  
                            name={`price`}
                            placeholder="0 baht"
                            initialValue={item.total_price}
                          />
                          <input type="hidden" name="location_id" value={item?.order_request?.location_id} />
                          <input type="hidden" name="description" value="" />
                        </div>

                    </div>


                  
                  </div>

                  <div className="flex justify-between mt-4">
                  <button className="secondary-btn"> Mark as Expense</button>
                    <button className="primary-btn" type="submit"> Add to Inventory</button>
                  </div>

                  </form>


        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
