
import { Modal, Button, Text, Input,Textarea, Collapse  } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";


// to fix: order request modal by default show two order item, it should show none
export default function CreateOrderReq({type,visible, closeHandler, orderTypes, locations,item_size }) {

  const { mutate } = useSWRConfig();
  const orderItemProperty = ["description", "size", "quantity", "unit_price", "amount", "type"]
  const [orderItem, setOrderItem] = useState([]);
  const [step, setStep] = useState(1);
  const [currentStep, setcurrentStep] = useState(0)
  const allBuilding = Array.from(new Set(locations?.map(item => item?.building)))
  const [building, setBuilding] = useState([])
  const [locationOptions, setLocation] = useState(locations)
  const [message, setMessage] = useState("")



  const handleCreateOrderRequest = async event => {
    event.preventDefault();
    const items = orderItem.map((item, i) =>
      orderItemProperty.map((prop, num) => `${orderItemProperty[num]}-${i}`))
    const flatItems = items.reduce((all, curr) => {
      return [...all, ...curr]
    }, [])

    const datas = [...flatItems, "purchase_reason", "location_id", "desired_date", "remark"];
 
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
      closeHandler
    }

    const formatedData = JSON.stringify(cleanData)

    console.log({ formatedData });
    fetcher("/api/customer/order/createOrderRequest", formatedData).then(d => {
      console.log(d)
      mutate("/api/admin")
    })

  }


  const oneValidate =() =>{
    let purchase = document.querySelector(`[name="purchase_reason"]`)?.value;
    let location = document.querySelector(`[name="location"]`)?.value;

    if(!purchase && location =="Select Room"){setMessage("Please Fill all the fields (Building, Room, Purchase Reason)")}
    else if (!purchase ){setMessage("Purchase Reason is required")}
    else if(location =="Select Room" ){setMessage("Location is required (Building and Room)")}
    else{changeTab(step+1)}


  
    
  }

 function getItemAmount(num,quantity:string, unit_price:string) {
  let unit = document.querySelector(`[name="${quantity}"]`)?.value;
  let price = document.querySelector(`[name="${unit_price}"]`)?.value;
  let amount = document.querySelector(`[name="amount-${num}"]`);
  amount.value = unit*price
  
 
 }
  
  const changeTab =(num: number) =>{
    setStep(num)
    console.log(step)
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
        width={(step==2)?"700px":"600px"}
      >
        <Modal.Header>
          <Text id="modal-title" className="font-semibold" size={18}> Order Request (Creating) </Text>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={handleCreateOrderRequest} className="">
            <div className="flex flex-row  text-center">
              <p onClick={()=>changeTab(1)} className={(step==1)?"bg-blue-200 rounded-t-lg w-[33.3%]":"w-[33.3%]"}>Step 1</p>
              <p onClick={()=>changeTab(2)} className={(step==2)?"bg-blue-200 rounded-t-lg w-[33.3%]":"hidden"}>Step 2</p>
              <p onClick={()=>changeTab(3)} className={(step==3)?"bg-blue-200 rounded-t-lg w-[33.3%]":"hidden"}>Step 3</p>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full">
              <div className={(step==1)?"bg-primary-color py-[3px] rounded-l-full w-[33.33%]":
                              (step==2)?"bg-primary-color py-[3px] rounded-l-full w-[66.66%]":
                              (step==3)?"bg-primary-color py-[3px] rounded-l-full w-full":""}></div>
            </div>
            
          <div className={(step==1)?"mt-6 mb-4 flex flex-col gap-4":"hidden"}>
            <p className={(message !="")?"text-error-color font-bold text-lg":"hidden"}>&#128680; {message} &#128680;</p>
            {console.log(message)}
            <div className=" flex flex-col">
              <p className="  text-primary-color text-md font-normal">1. Location Details: </p>
              <span className="font-normal font-sm pl-[12px] text-sm">Building and room where the ordered item will be placed</span>
            
            
              <div className="flex flex-row gap-4 mt-2">
                <select  required className=" form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="location selection" aria-labelledby="location selection" onChange={e => setBuilding(e.target.value)}>
                  <option>Select Building </option>
                    {allBuilding?.map((building, num) => 
                        <option key={num} value={building} >{building}</option>)}
            
                </select>

                <select required name="location" className=" form-select appearance-none block w-1/2 p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="room selection">
                  <option> Select Room </option>
                    {locationOptions?.map((location, num) => 
                        <option key={num} value={location.id} >{location.room_number}</option>)}
                </select>
              </div>
            </div>
          
            <Textarea bordered fullWidth
              color="primary"
              name="purchase_reason"
              label="2. Purchase Reason"
              placeholder="enter reason of purchase"
              className="font-normal"
            />

          </div>

          <div className={(step==2)?"mt-6 mb-4":"hidden"}>

          <div className=" flex flex-col">
            <div>
              <p className="  text-primary-color text-md font-normal inline-flex gap-1 items-center">3. Order Details: <span className="font-normal text-gray-700 font-sm  text-sm">To add an item to the order request, click <span className="font-semibold">("Add Items")</span></span></p>
              
              </div>
            </div>
            <Collapse.Group>
              {orderItem?.map((item, num) =>

              <Collapse title={`Order Item ${num+1}: click to open`}>

                  <div key={num} className ="flex flex-col gap-4 p-2">
                    
                    <div className="flex flex-col gap-4 ">
                      <Input  bordered fullWidth
                          color="primary" 
                          size="lg"
                          type="text"
                          label="Description"  
                          name={`description-${num}`}
                          />
                      <div className=" flex flew-row gap-4 items-center ">

                         
                        <div className="w-full">
                        <label className="  text-primary-color text-md font-normal">Size </label>
                          <select name={`size-${num}`} required className=" form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="location selection" aria-labelledby="items size selection">
                              <option>Select Size </option>
                                {item_size?.map((size, num) =><option key={num} value={size} >{size}</option>)}
                          </select>
                       
                        </div>

                          <Input  bordered fullWidth
                          color="primary" 
                          size="lg"
                          type="number"
                          label="Quantity"  
                          name={`quantity-${num}`}
                          initialValue={"0"} 
                          onChange={() => getItemAmount(num,`quantity-${num}`,`unit_price-${num}` )}
                          />

                          <Input  bordered fullWidth
                          color="primary" 
                          size="lg"
                          type="number"
                          label="Unit Price"  
                          name={`unit_price-${num}`}
                          initialValue={"0"} 
                          onChange={() => getItemAmount(num,`quantity-${num}`,`unit_price-${num}` )}
                          
                          />

                          <Input  bordered fullWidth
                          color="primary" 
                          size="lg"
                          type="number"
                          readOnly
                          label="Total Amount"
                          initialValue={"o"} 
                          name={`amount-${num}`}
                          />
                      

                      </div>
                    </div>

                    <div className=" xl:w-88 mb-4" >
                        <Text color="primary" className="mb-1">Type (click to select Type)</Text>
                          <select  name={`type-${num}`}className="form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                          focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="Zone selection">
                              {orderTypes?.map((item, id) => <option key={id}>{item.type}</option>)}  
                      
                          </select>
                      </div>
                  </div>
                  </Collapse>
              )}
              </Collapse.Group>

              <div className="flex flex-col justify-center mt-2">
                <div className="flex justify-center">
                  <Button auto flat  onClick={() => setOrderItem([...orderItem.slice(0, orderItem.length - 1)])} className={(orderItem.length != 0)?"text-red-500":"hidden"}>Remove Items (-)</Button>
                
                  <Button auto flat  onClick={() => setOrderItem([...orderItem, 1])} className="">Add Items (+)</Button>
                </div>
                 
              </div> 
          </div>

          <div className={(step==3)?"bg-green-500":"hidden"}>
          <Button auto className="bg-primary-color mt-8" type="submit">Create Order Request</Button>
          </div>
          
          <div className="mt-4 flex w-full justify-between">
              <button onClick={()=>changeTab(step-1)} type="button" className={(step>1)?"secondary-btn":"invisible"}>&lt;- Back</button>
              <button onClick={()=>oneValidate()} type="button" className="primary-btn">Continue -&gt;</button>
        </div>



       

         
          </form>
         
        </Modal.Body>
      </Modal>
    </>
  );
}
