
import { Modal, Button, Text, Input,Textarea, Collapse  } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useState } from "react";
import StyledStatus from "../customer/StyledStatus";
import { IconButton } from "../admin/icons/IconButton";
import { EyeIcon } from "../admin/icons/EyeIcon";
import { DeleteIcon } from "../admin/icons/DeleteIcon";
import DateConvert from "../dateConvert";


export default function UpdateRegStatus({type,visible, closeHandler, orderRequest, email, pageType}) {
  const { mutate } = useSWRConfig();
  const [comment, setComment] = useState("");


  const handlePurchased = async (orderId:Number) => {
 
    fetcher("/api/common/order/purchased", { orderId }).then((d) => {
      
      mutate(`/api/${pageType}`)
    })
    closeHandler()
  }


  const handleApprove = async (item: Number) => {
 
    fetcher("/api/common/order/approve", { orderId: item }).then((d) => {
      
      mutate(`/api/${pageType}`)
    })
  }

  const handleDeleteComment = async (item: Number) => {
    fetcher("/api/common/order/deleteComment", { commentId: item }).then((d) => {
      
      mutate(`/api/${pageType}`)
    })


  }

  const handleReject = async (item: Number) => {
    fetcher("/api/common/order/reject", { orderId: item }).then((d) => {
      
      mutate(`/api/${pageType}`)
    })
  }

  const handleComment = async (order_request: String, comment: String, item: Number) => {

    fetcher("/api/common/order/comment", { comment, orderId: item }).then((d) => {
      

      mutate(`/api/${pageType}`)
    })

    closeHandler();

    // let recipient;
    // if (order_request?.location?.users?.length) {
    //  recipient = order_request.location?.users?.map(item => item.email).join(", ")
    // } else {
    // }
    // fetcher("/api/common/send_email", {recipient, comment}).then(d => {
    // }) 
  }


  return (
    <>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="700px"
      >
        <Modal.Header>
          <Text id="modal-title" size={18}> Order Request Details (# {orderRequest.id}) </Text>
        </Modal.Header>
        <Modal.Body>

          <form  className="">
            
          <div className="flex flex-row gap-2">
            <p className="text-lg font-semibold">Order Status:</p>
            <div className="w-2/3">
              <StyledStatus status={`${orderRequest.approval_by?.length > 0 && orderRequest.order_status == "Pending"? `Pending (${orderRequest.approval_by.length}/2)` : orderRequest.order_status}`} /> 
            </div>
        
          </div>
 
          <div className="flex gap-12 mt-2 ">
            <p className="text-lg font-semibold">Purchase Reason: <span className="font-normal">{orderRequest.purchase_reason}</span> </p>
          </div>

      <fieldset className="border-2 rounded-lg mb-4">
        <legend className=" pr-4 font-semibold">Items:</legend> 
          <Collapse.Group divider={true} >
              {orderRequest.order_items && orderRequest.order_items.map((item, num) =>
                <div>
                    <Collapse key={num} title={`${item.name}: ${item.total_price}`}>
                        <div  className ="flex flex-col gap-4 px-2">
                          <div className="flex flex-row gap-4">
                          <Input  bordered fullWidth
                                    readOnly
                                    color="primary" 
                                    size="lg"
                                    type="text"
                                    label="Type"  
                                    name={`type-${num}`}
                                    initialValue ={item.type}
                                    />
                          <Input  bordered fullWidth
                                    readOnly
                                    color="primary" 
                                    size="lg"
                                    type="text"
                                    label="Quantity unit"  
                                    name={`quantity_unit-${num}`}
                                    initialValue={item.quantity_unit} 
                                    />

                                    <Input  bordered fullWidth
                                    readOnly
                                    color="primary" 
                                    size="lg"
                                    type="number"
                                    label="Quantity"  
                                    name={`quantity-${num}`}
                                    initialValue={item.quantity}
                                    />

                                    <Input  bordered fullWidth
                                    readOnly
                                    color="primary" 
                                    size="lg"
                                    type="number"
                                    label="Unit Price"  
                                    name={`unit_price-${num}`}
                                    initialValue={item.unit_price}
                                    />

                          </div>
                                    
                                    <Textarea bordered fullWidth readOnly
                                        color="primary"
                                        name={`quotation`}
                                        label="Quotation (Reference Links)"
                                        initialValue={item.quotation} 
                                        className="font-normal"
                                      />
                            </div>
                          
                    </Collapse>

                </div>
              )}
          </Collapse.Group>
         </fieldset>
            <div className="flex  justify-between">
                <p className="text-lg font-semibold">Total Cost: <span className="text-lg font-normal">{orderRequest.total_price} baht </span> </p>
                <p className="text-lg font-semibold">Desired Date: <span className="text-lg font-normal">{<DateConvert date={orderRequest.desired_date} type="date" />}</span></p>     
            </div>
              <p className="text-lg font-semibold"> Approved by:<span className="font-normal"> {orderRequest.approval_by && orderRequest.approval_by.map((item, k) =>
                  <span key={k}>{item.role}</span>)} </span></p>

              <p className="text-lg font-semibold"> Rejected by: <span className="font-normal"> {orderRequest.remark && orderRequest.remark.map((item, k) =>
                  <span key={k}>{item.role}</span>)} </span></p>
         

                  <Collapse.Group className="-ml-3" >
                  <Collapse title={(orderRequest.comment_by && orderRequest.comment_by.length>0)? `Comment (click to view ${orderRequest.comment_by.length} comments )`:"Comments (no comments were added)" } className="font-semibold">
                    <div className="flex flex-col gap-2">

                    {orderRequest.comment_by && orderRequest.comment_by.map((item, k) =>
                     
                        <p key={k} className="text-left flex flex-col ml-4" ><span className="flex flex-row justify-between -ml-4">{k +1}. {item.user} ({item.role}): <IconButton  onClick={e => handleDeleteComment(item.id)}> <DeleteIcon size={15} fill="#FF0080" hidden={(item.user != email)}/></IconButton></span> {item.comment}
                          
                        </p>
                    )} 
                    </div>
                  </Collapse>
                  </Collapse.Group>
               

         {(type=="view_details")
            ?
              <div className="flex justify-center mt-4">
                <Button auto flat  onClick={closeHandler} className="bg-primary-color text-white">Close</Button>
              </div>
            :(pageType=="purchase")?
                <div className="flex justify-center mt-4">
                    <Button auto flat  onClick={() => handlePurchased(orderRequest.id)} className="bg-primary-color text-white">Mark As Purchased</Button>
              </div>
             : <div >
                <div className="flex justify-center mb-4 gap-40">
                    <Button auto bordered color="error"onClick={e => handleReject(orderRequest.id)} className="text-red-500">Reject &#128680;</Button>
                    <Button auto bordered color="primary"  onClick={e => handleApprove(orderRequest.id)}> Approve &#9989;</Button>
                  </div>
                
                  <Textarea bordered fullWidth
                  color="primary"
                  name="reason" 
                  placeholder="Comment regarding the order request" 
                  onChange={(e) => setComment(e.target.value)}/>
                <div className="flex justify-center mt-3">
                {/* <Button auto flat  onClick={closeHandler} className="text-error-color">Close</Button> */}
                    <Button auto className="primary-btn" onClick={e => handleComment(orderRequest, comment, orderRequest.id)}>Save Comment</Button>
                </div>
              
              </div>
                }
               
           
          </form>
         
        </Modal.Body>
      </Modal>
    </>
  );
}
