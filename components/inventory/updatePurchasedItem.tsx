
import { Modal, Button, Text, Input, Radio, Spacer, Textarea, Collapse } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher, createLog, useInfo } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";
import DateConvert from "../dateConvert";


export default function UpdatePurchasedItem({visible, closeHandler, item, location }) {
    const { mutate } = useSWRConfig()

   
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
    
          <p>order date, depreciatioin, a</p>
          <div  className ="flex flex-col gap-4 p-2">
                    
                    <div className="flex flex-col gap-4 ">
                      <Input  bordered fullWidth
                          color="primary" 
                          size="lg"
                          type="text"
                          label="Name" 
                          placeholder="Item Name"
                          name={"name"}
                          initialValue={item.name}
                          />

                      <Input  bordered fullWidth
                          color="primary" 
                          size="lg"
                          type="text"
                          label="Description" 
                          placeholder="Item Description"
                          name={"description"}
                          initialValue={item.description}
                          />


                      <div className="flex flew-row gap-4 items-center">
                      
                      <Input  bordered fullWidth
                            readOnly
                            color="primary" 
                            size="lg"
                            type="text"
                            label="Order Date"  

                            initialValue={`${<DateConvert date={item.order_date} type="date"/>}`}
                            />

                        <Input  bordered fullWidth
                            required
                            color="primary" 
                            size="lg"
                            type="Date"
                            label="Depreciation Date"  
                            name={`depreciation`}
                       

                            />
                        </div>

                        <div className="flex flew-row gap-4 items-center">
                          <Input  bordered fullWidth
                            color="primary" 
                            size="lg"
                            type="text"
                            label="Type"  
                            name={`type`}
                            initialValue={item.type}
                            />

                          <Input  bordered fullWidth
                            required
                            color="primary" 
                            size="lg"
                            type="text"
                            label="Item Code"  
                            name={`item_code`}
                            placeholder="Item Code"
                            />
                        </div>

                        <div className="flex flew-row gap-4 items-center">
                        <Input  bordered fullWidth
                          color="primary" 
                          size="lg"
                          type="number"
                          label={`Quantity (${item.quantity_unit})`} 
                          name={`quantity`}
                          min="1"
                          placeholder="0x"
                          initialValue={item.quantity}
       
                          />

                          <Input  bordered fullWidth
                          color="primary" 
                          size="lg"
                          type="number"
                          min="1"
                          label="Price (Baht) *"  
                          name={`price`}
                          placeholder="0 baht"
                          initialValue={item.price}
                          />
                        </div>
 

                  

                      
                    </div>


                      <Textarea bordered fullWidth
                          color="primary"
                          name={`quotation-`}
                          label="Quotation (Reference Links)"
                          placeholder="item reference links (shops, e-stores)"
                          className="font-normal"
                          initialValue={item.name}
                        />
                  </div>


        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
