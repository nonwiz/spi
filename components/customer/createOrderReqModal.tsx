
import { Modal, Button, Text, Input,Textarea, Collapse  } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";


// to fix: order request modal by default show two order item, it should show none
export default function CreateOrderReq({type,visible, closeHandler, orderTypes, locations,quantity_unit }) {

  const { mutate } = useSWRConfig();
  const orderItemProperty = ["description", "size", "quantity", "unit_price", "amount", "type"]
  const [orderItem, setOrderItem] = useState([]);
  const [step, setStep] = useState(1);
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
    closeHandler
    //we should add a try and catch here

  }

  /**
   * validates if all fields are filled in the step 1, and also allows navigation to next page
   * @param msg 
   * @param nextStep 
   */
  const changeTab =(msg:String, nextStep:number) =>{
    if(msg=="continue" && step==1){
      let purchase = document.querySelector(`[name="purchase_reason"]`)?.value;
      let location = document.querySelector(`[name="location"]`)?.value;
  
      if(!purchase && location =="Select Room"){setMessage("Please Fill all the fields (Building, Room, Purchase Reason)")}
      else if (!purchase ){setMessage("Purchase Reason is required")}
      else if(location =="Select Room" ){setMessage("Location is required (Building and Room)")}
      else if(message==""){setStep(nextStep)}
    }else if(msg=="continue" && nextStep==2){
      if(message==""){setStep(nextStep)}
    }else{
      setMessage("")
      setStep(nextStep)
    }
  }

  /**
   * gets the value of uni and multiplies it with the price to get total amount
   * @param num 
   */
 const getItems =(num:number) =>{
    let unit = document.querySelector(`[name="quantity-${num}"]`)?.value;
    let price = document.querySelector(`[name="unit_price-${num}"]`)?.value;
    let amount = document.querySelector(`[name="amount-${num}"]`);
    amount.value = unit*price

 }

 /**
  * validates the items fiels, before being able to add another item
  * @param num 
  */
 const addItems = (num) =>{
   if(num>0){
      let name = document.querySelector(`[name="name-${num-1}"]`)?.value;
      let unit = document.querySelector(`[name="quantity-${num-1}"]`)?.value;
      let price = document.querySelector(`[name="unit_price-${num-1}"]`)?.value;


      if(name=="" && unit=="" && !price==""){setMessage("Please provide the item Name, Price, and number of units")}
      if(name=="" && unit=="" ){setMessage("Please provide the item Name and number of units")}
      if(name=="" && price=="" ){setMessage("Please provide the item Name and price")}
      if(unit=="" && price=="" ){setMessage("Please provide the item price and number of units")}
      if(unit==""){setMessage("Please provide the number of units")}
      if(price==""){setMessage("Please provide the item price")}
      if(name==""){setMessage("Please provide the item name")}
    }
    if(message==""){setOrderItem([...orderItem, 1])}
  }
  

  useEffect(() => {
    console.log("change building")
    const filterLocations = locations?.filter(loc => loc?.building == building)
    setLocation(filterLocations);
  }, [building])


  return (
    <>
    {console.log(step)}
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width={(step==2)?"700px":"600px"}
      >
        <Modal.Header>
          <Text id="modal-title" className="font-semibold" size={18}> Order Request (Creation) </Text>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={handleCreateOrderRequest} className="">
            <div className="flex flex-row  text-center">
              <p className={(step==1)?"bg-primary-color rounded-t-lg w-[33.3%]":"w-[33.3%]"}>Step 1</p>
              <p className={(step==2)?"bg-primary-color rounded-t-lg w-[33.3%]":(step>=2)?"w-[33.3%]":"hidden"}>Step 2</p>
              <p className={(step==3)?"bg-primary-color rounded-t-lg w-[33.33%]":(step>=3)?"w-[33.3%]":"hidden"}>Step 3</p>
            </div>
            
            <div className="w-full bg-gray-200 ">
              <div className={(step==1)?"bg-primary-color py-[3px] rounded-y-full w-[33.33%]":
                              (step==2)?"bg-primary-color py-[3px] rounded-y-full w-[66.6%]":
                              (step==3)?"bg-primary-color py-[3px] rounded-y-full w-full":""}></div>
            </div>
            
          <div className={(step==1)?"mt-6 mb-4 flex flex-col gap-4":"hidden"}>
            <p className={(message !="")?"text-error-color font-bold text-lg":"hidden"}>&#128680; {message} &#128680;</p>
           
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

            <div className="flex w-full justify-end">
              <button onClick={()=>changeTab("continue",step+1)} type="button" className="primary-btn">Continue -&gt;</button>
          </div>

          </div>

          <div className={(step==2)?"mt-6 mb-4":"hidden"}>

          <div className=" flex flex-col">
            <div>
              <p className="  text-primary-color text-md font-normal inline-flex gap-1 items-center">3. Order Details: <span className="font-normal text-gray-700 font-sm  text-sm">Your request can contain 1 or more order items</span></p>
              <p className="font-normal text-gray-700 font-sm ">- To add an item, click <span className="font-semibold text-sm">("Add Items") </span></p>
              <p className={(orderItem.length>=1)?"font-normal text-gray-700 font-sm":"hidden"}>- To remove an item, click <span className="font-semibold text-sm text-error-color">("Remove Items") </span></p>
              
              </div>
            </div>
            <Collapse.Group>
              {orderItem?.map((item, num) =>

              <Collapse key={num} title={`Order Item ${num+1}: click to open`}>
                <div>
                    <p className={(message !="")?"text-error-color font-bold text-lg":"hidden"}>&#128680; {message} &#128680;</p>
                  <div  className ="flex flex-col gap-4 p-2">
                    
                    <div className="flex flex-col gap-4 ">
                      <Input  bordered fullWidth
                          required
                          color="primary" 
                          size="lg"
                          type="text"
                          label="Name *" 
                          placeholder="Item Name"
                          name={`name-${num}`}
                          onChange={() => getItems(num)}
                          />
                      <div className=" flex flew-row gap-4 items-center ">

                         
                        <div className="w-full">
                        <label className="  text-primary-color text-md font-normal">Quanity Unit </label>
                          <select name={`quantity_unit-${num}`} required className=" form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="location selection" aria-labelledby="items size selection">
                              <option>Select unit </option>
                                {quantity_unit?.map((unit, num) =><option key={num} value={unit} >{unit}</option>)}
                          </select>
                       
                        </div>

                          <Input  bordered fullWidth
                          color="primary" 
                          size="lg"
                          type="number"
                          label="Quantity *"  
                          name={`quantity-${num}`}
                          placeholder="0x"
                          onChange={() => getItems(num)}
                          />

                          <Input  bordered fullWidth
                          color="primary" 
                          size="lg"
                          type="number"
                          label="Unit Price (Baht) *"  
                          name={`unit_price-${num}`}
                          placeholder="0 baht"
                          onChange={() => getItems(num)}
                          
                          />

                          <Input  bordered fullWidth
                          color="primary" 
                          size="lg"
                          readOnly
                          label="Total Amount"
                          placeholder="0 baht"
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

                      <Textarea bordered fullWidth
                          color="primary"
                          name={`quotation-${num}`}
                          label="Quotation (Reference Links)"
                          placeholder="item reference links (shops, e-stores)"
                          className="font-normal"
                        />
                  </div>
                </div>
                  </Collapse>
              )}
              </Collapse.Group>

              <div className="flex flex-col justify-center mt-2">
                <div className="flex justify-center">
                  <Button auto flat  onClick={() => setOrderItem([...orderItem.slice(0, orderItem.length - 1)])} className={(orderItem.length != 0)?"text-red-500":"hidden"}>Remove Items (-)</Button>
                
                  <Button auto flat  onClick={() => addItems(orderItem.length)} className="">Add Items (+)</Button>
                </div>
                 
              </div> 

              <div className="mt-4 flex w-full justify-between px-4">
              <button onClick={()=>changeTab("back",step-1)} type="button" className="secondary-btn">&lt;- Back</button>
              <button onClick={()=>changeTab("continue",step+1)} type="button" className="primary-btn">Continue -&gt;</button>
          </div>
          </div>

          <div className={(step==3)?"mt-6 mb-4":"hidden"}>
           
              <div className="mb-2">
                  <label htmlFor="desired_date" className="  text-primary-color text-md font-normal inline-flex gap-1 items-center">4. Desired Date: <span className="font-normal text-gray-700 font-sm  text-sm">When will you orders be needed?</span></label>
                  <p className="font-normal text-gray-700 font-sm mb-4 ">- Note: the purchasing office purchases orders every  <span className="font-semibold text-sm"> _____ and ______ /week </span></p>
                </div>
              <Input  bordered fullWidth required
                  color="primary" size="lg"
                  type="date" 
                  name={`desired_date`}
                  aria-label="desired date"
                  
                />

       

              <div className="mt-16 flex w-full justify-between">
                <button onClick={()=>changeTab("back",step-1)} type="button" className="secondary-btn">&lt;- Back</button>
                <Button auto className="bg-primary-color" type="submit">Create Order Request</Button>
              </div>
          </div>
          

          </form>
         
        </Modal.Body>
      </Modal>
    </>
  );
}
