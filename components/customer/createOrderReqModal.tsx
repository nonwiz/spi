
import { Modal, Button, Text, Input,Textarea, Collapse  } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher, createLog } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";
import next from "next";


// to fix: order request modal by default show two order item, it should show none
export default function CreateOrderReq({type,visible, closeHandler, orderTypes, locations,quantity_unit, office }) {
console.log("office", office)
  const { mutate } = useSWRConfig();
  const orderItemProperty = ["name", "quotation", "quantity_unit", "quantity", "unit_price", "total_price", "type"]
  const [orderItem, setOrderItem] = useState([]);
  const [step, setStep] = useState(1);
  const allBuilding = Array.from(new Set(locations?.map(item => item?.building)))
  const [building, setBuilding] = useState([])
  const [locationOptions, setLocation] = useState(locations)
  const [message, setMessage] = useState("")
  const [ needAction, setAction] = useState(false)
  const [ totalAmount, SetTotalAmount] = useState(0)

  const handleCreateOrderRequest = async event => {
    event.preventDefault();
    const items = orderItem.map((item, i) =>
      orderItemProperty.map((prop, num) => `${orderItemProperty[num]}-${i}`))
    const flatItems = items.reduce((all, curr) => {
      return [...all, ...curr]
    }, [])

    const datas = [...flatItems, "purchase_reason", "location_id", "desired_date", "action_number"];
 
    const formData = getFieldsValues(event, datas);
    const cleanData = {
      items: [],
      purchase_reason: formData["purchase_reason"],
      desired_date: formData["desired_date"],
      location_id: formData["location_id"],
      action_number: formData["action_number"]
    }
    for (let i = 0; i < orderItem.length; i++) {
      const item = {};
      orderItemProperty.forEach(f => {
        item[f] = formData[`${f}-${i}`];
      })
      cleanData.items.push(item)
      closeHandler()
    }

    const formatedData = JSON.stringify(cleanData)

    fetcher("/api/customer/order/createOrderRequest", formatedData).then(d => {
      mutate("/api/admin")
    })
    createLog("OrderRequest & OrderItem", `Create: new orders items`, "Create")

    closeHandler();
    //we should add a try and catch here

  }


  const displayNamePrice = (num:number) =>{
    const items ={}
    // for (let num = 0; num < orderItem.length; num++) {
      let amount = document.querySelector(`[name="total_price-${num}"]`)?.value
      let name = document.querySelector(`[name="name-${num}"]`)?.value;

    if(name != null && amount !=null){
      return `Item: ${name} - ${amount} Baht`
    }else{
      return null
    }
  }

  /**
   * sums all the total price of items in the order request, and also checks if the total price is above 6000 baht
   */
  const getTotalAmount =() =>{
    let count = 0
     for (let num = 0; num < orderItem.length; num++) {
       let amount = document.querySelector(`[name="total_price-${num}"]`)?.value
       if(amount != null){
         count += Number(amount)
        }
     }

     if(count >=6000){
       console.log(count, "hehehhehe")
      setAction(true)
     }else{
      setAction(false)
     }
  
   }

  /**
   * validates if all fields are filled in the step 1, and also allows navigation to next page
   * @param msg 
   * @param nextStep 
   */
  const changeTab =(msg:String, nextStep:number) =>{
    if(msg=="continue" && step==1){
      console.log(nextStep, "hel;oooooooooooooooooooo","really")
      let purchase = document.querySelector(`[name="purchase_reason"]`)?.value;
      let location = document.querySelector(`[name="location_id"]`)?.value;
    
      if(!purchase && location =="Select Room"){setMessage("Please Fill all the fields (Building, Room, Purchase Reason)")}
      else if (!purchase ){setMessage("Purchase Reason is required")}
      else if(location =="Select Room" ){setMessage("Location is required (Building and Room)")}
      else if(message==""){setStep(nextStep)}

    }else if(msg=="continue" && nextStep==2){

      if(message==""){setStep(nextStep)}
    }else{
      getTotalAmount()
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
    let amount = document.querySelector(`[name="total_price-${num}"]`);
    amount.value = unit*price

 }
 
 /**
  * validates the items fiels, before being able to add another item
  * @param num 
  */
 const addItems = (num) =>{
   let total =0
   if(num>0){
      let name = document.querySelector(`[name="name-${num-1}"]`)?.value;
      let unit = document.querySelector(`[name="quantity-${num-1}"]`)?.value;
      let price = document.querySelector(`[name="unit_price-${num-1}"]`)?.value;
      total = unit * price


      if(name=="" && unit=="" && !price==""){setMessage("Please provide the item Name, Price, and number of units")}
      if(name=="" && unit=="" ){setMessage("Please provide the item Name and number of units")}
      if(name=="" && price=="" ){setMessage("Please provide the item Name and price")}
      if(unit=="" && price=="" ){setMessage("Please provide the item price and number of units")}
      if(unit==""){setMessage("Please provide the number of units")}
      if(price==""){setMessage("Please provide the item price")}
      if(name==""){setMessage("Please provide the item name")}
    }
    if(message==""){
      displayNamePrice(num-1)
      setOrderItem([...orderItem, 1])
      // SetTotalAmount(totalAmount+total)
    }
  }


  

 

  useEffect(() => {

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
              <div className={(step==1)?"bg-primary-color py-[3px] rounded-y-full w-[33.33%] text-white":
                              (step==2)?"bg-primary-color py-[3px] rounded-y-full w-[66.6%] text-white":
                              (step==3)?"bg-primary-color py-[3px] rounded-y-full w-full text-white":""}></div>
            </div>
            
          <div className={(step==1)?"mt-6 mb-4 flex flex-col gap-4":"hidden"}>
            <p className={(message !="")?"text-error-color font-bold text-lg":"hidden"}>&#128680; {message} &#128680;</p>
           
            <div className=" flex flex-col">
              <p className="  text-primary-color text-md font-normal">1. Location Details: </p>
              <span className="font-normal font-sm pl-[12px] text-sm">Building and room where the ordered item will be placed</span>
           {!office ? 
              <div className="flex flex-row gap-4 mt-2">
                <select  required className=" form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="location selection" aria-labelledby="location selection" onChange={e => setBuilding(e.target.value)}>
                  <option>Select Building </option>
                    {allBuilding?.map((building, num) => 
                        <option key={num} value={building} >{building}</option>)}
            
                </select>

                <select required name="location_id" className=" form-select appearance-none block w-1/2 p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="room selection">
                  <option> Select Room </option>
                    {locationOptions?.map((location, num) => 
                        <option key={num} value={location.id} >{location.room_number}</option>)}
                </select>
              </div>
              : 
              <>
              <p className="p-1 mx-2 font-bold"> Selected: as your office location </p>
              <input type="hidden" name="location_id" value={office} />
              </>
}

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

              <Collapse key={num} title={(displayNamePrice(num) !=null)?displayNamePrice(num):`Order Item ${num+1}: click to open`}>
     
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
                          min="1"
                          placeholder="0x"
                          onChange={() => getItems(num)}
                          />

                          <Input  bordered fullWidth
                          color="primary" 
                          size="lg"
                          type="number"
                          min="1"
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
                          name={`total_price-${num}`}
                          
                          />

                      </div>

                      
                    </div>

                    <div className=" xl:w-88 mb-4" >
                        <Text color="primary" className="mb-1">Type (click to select Type)</Text>
                          <select  name={`type-${num}`}className="form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                          focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="Zone selection">
                              {orderTypes?.map((item, id) => <option key={id}>{item}</option>)}  
                      
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

       {needAction ? 
       <>
              <div className="my-2">
                  <label htmlFor="desired_date" className="  text-primary-color text-md font-normal inline-flex gap-1 items-center">5. Your order is more than 6000 baht. Please fill the ACTION NUMBER.</label>
                </div>
              <Input  bordered fullWidth required
                  color="primary" size="lg"
                  type="text" 
                  name={`action_number`}
                  aria-label="action_number"
                  
                />
                </>
       :
       <input type="hidden" name="action_number" />
       }

       



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
