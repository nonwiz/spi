
import { Modal, Button, Text, Input, Radio, Spacer, Textarea, Collapse } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher, createLog, useInfo } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";
import DateConvert from "../dateConvert";


export default function ViewItemModal({visible, closeHandler, item, location }) {
    const { mutate } = useSWRConfig()
    console.log(item)
   
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
          <Text id="modal-title" size={18} className="font-semibold">Item Information</Text>
        </Modal.Header>
        <Modal.Body>
    
              <p className="text-label">Name: <span className="font-normal text-gray-700">{item.name}</span></p>
              <p className="text-label">Description: <span className="font-normal text-gray-700">{item.description}</span></p>
          <div className="grid grid-cols-2 gap-2">
              <p className="text-label">Location: <span className="font-normal text-gray-700">{location}</span></p>

            
                <p className="text-label">Price: <span className="font-normal text-gray-700">{item.price}</span></p>
                <p className="text-label">Order Date: <span className="font-normal text-gray-700"><DateConvert date={item.order_date} type="date" /></span></p>
       
    
            
                <p className="text-label">Is Asset: <span className="font-normal text-gray-700">{(item.isAsset)?"Yes":"No"}</span></p>
                <p className="text-label">Type: <span className="font-normal text-gray-700">{(item.type)?item.type:"Not specified"}</span></p>
           
                <p className="text-label">Quantity: <span className="font-normal text-gray-700">{item.quantity}</span></p>
                <p className="text-label">Quantity Unit: <span className="font-normal text-gray-700">{item.quantity_unit}</span></p>
         

          </div>


        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
