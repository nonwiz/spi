
import { Modal, Button, Text, Input,  Radio, Spacer, Textarea  } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useState } from "react";


export default function CreateOrderReq({type,visible, closeHandler, orderTypes}) {

  const { mutate } = useSWRConfig();
  const orderItemProperty = ["description", "size", "quantity", "unit_price", "amount", "type"]
  const [orderItem, setOrderItem] = useState([1, 1]);

  const handleCreateOrderRequest = async event => {
    event.preventDefault();
    const items = orderItem.map((item, i) =>
      orderItemProperty.map((prop, num) => `${orderItemProperty[num]}-${i}`))
    const flatItems = items.reduce((all, curr) => {
      return [...all, ...curr]
    }, [])

    const datas = [...flatItems, "purchase_reason"];
    console.log({ datas })
    const formData = getFieldsValues(event, datas);
    const cleanData = {
      items: [],
      purchase_reason: formData["purchase_reason"],
    }
    for (let i = 0; i < orderItem.length; i++) {
      const item = {};
      orderItemProperty.forEach(f => {
        item[f] = formData[`${f}-${i}`];
      })
      cleanData.items.push(item)
    }

    const formatedData = JSON.stringify(cleanData)

    console.log({ formatedData });
    fetcher("/api/customer/order/createOrderRequest", formatedData).then(d => {
      console.log(d)
      mutate("/api/admin")
    })

  }

  return (
    <>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width={500}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}> Order Request (Creating) </Text>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={handleCreateOrderRequest} className="">
          {orderItem.map((item, num) =>
            <div key={num} className ="flex flex-col gap-4">
              
              <div className="flex flex-col gap-4">
              <Input  bordered fullWidth
                  color="primary" 
                  size="lg"
                  type="text"
                  label="Description"  
                  name={`description-${num}`}
                />
              <div className=" flex flew-row gap-4">

              <Input  bordered fullWidth
                  color="primary" 
                  size="lg"
                  type="text"
                  label="Size"  
                  name={`size-${num}`}
                />

                <Input  bordered fullWidth
                  color="primary" 
                  size="lg"
                  type="number"
                  label="Quantity"  
                  name={`quantity-${num}`}
                />

                <Input  bordered fullWidth
                  color="primary" 
                  size="lg"
                  type="number"
                  label="Unit Price"  
                  name={`unit_price-${num}`}
                />

                <Input  bordered fullWidth
                  color="primary" 
                  size="lg"
                  type="number"
                  label="Amount"  
                  name={`amount-${num}`}
                />
              </div>
              </div>

              <div className=" xl:w-88 mb-4" >
                  <Text color="primary" className="mb-1">Type (click to select Type)</Text>
                    <select  name={`type-${num}`}className="form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                    focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="Zone selection">
                        {orderTypes.map((item, id) => <option key={id}>{item.type}</option>)}  
                
                    </select>
                </div>
            </div>
          )}

              <Textarea bordered fullWidth
                color="primary"
                name="purchase_reason"
                label="Purchase Reason"
                placeholder="enter reason of purchase"
              />

              <div className="flex flex-col justify-center mt-2">
                <div className="flex justify-center">
                  <Button auto flat  onClick={() => setOrderItem([...orderItem.slice(0, orderItem.length - 1)])} className="text-red-500">Remove Items (-)</Button>
                  <Button auto flat  onClick={() => setOrderItem([...orderItem, 1])} className="">Add Items (+)</Button>
                </div>
                  <Button auto className="bg-primary-color mt-8" type="submit">Create Order Request</Button>
              </div>
          </form>
         
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
