
import { Modal, Button, Text, Input,Textarea, Collapse  } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useState } from "react";
import StyledStatus from "../customer/StyledStatus";


export default function UpdateRegStatus({type,visible, closeHandler, orderRequest, email}) {
  const { mutate } = useSWRConfig();
  const [comment, setComment] = useState("");
  console.log("Update reg", orderRequest)
  const handleApprove = async (item: Number) => {
 
    fetcher("/api/common/order/approve", { orderId: item }).then((d) => {
      console.log(d)
      mutate("/api/purchase")
    })
  }

  const handleDeleteComment = async (item: Number) => {
    fetcher("/api/common/order/deleteComment", { commentId: item }).then((d) => {
      console.log(d)
      mutate("/api/purchase")
    })
  }

  const handleReject = async (item: Number) => {
    fetcher("/api/common/order/reject", { orderId: item }).then((d) => {
      console.log(d)
      mutate("/api/purchase")
    })
  }

  const handleComment = async (comment: String, item: Number) => {
    fetcher("/api/common/order/comment", { comment, orderId: item }).then((d) => {
      console.log(d)
      mutate("/api/purchase")
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
          <Text id="modal-title" size={18}> Order Request Details (# {orderRequest.id}) </Text>
        </Modal.Header>
        <Modal.Body>

          <form  className="">


          <div className="flex gap-2">
            <p className="text-lg font-semibold">Order Status:</p>
            <StyledStatus status={orderRequest.order_status}/>
          </div>
          <div className="flex gap-12 mt-2 ">
            <p className="text-lg font-semibold">Reason:</p>
            <p className="text-lg">Purchase Reason: {orderRequest.purchase_reason}</p>
          </div>


      <fieldset className="border-2 rounded-lg mb-4">
        <legend className=" pr-4 font-semibold">Items:</legend> 
          <Collapse.Group  >
              {orderRequest.order_items && orderRequest.order_items.map((item, num) =>
                <div>
                    <Collapse title={`${item.description}`}>

                        <div key={num} className ="flex flex-col gap-4">
                          <div className="flex flex-row gap-2">
                                    <Input  bordered fullWidth
                                    readOnly
                                    color="primary" 
                                    size="lg"
                                    type="text"
                                    label="Size"  
                                    name={`size-${num}`}
                                    initialValue ={item.size}
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
                                    <Input  bordered fullWidth
                                    readOnly
                                    color="primary" 
                                    size="lg"
                                    type="text"
                                    label="Type"  
                                    name={`type-${num}`}
                                    initialValue={item.type} 
                                    />
                              
                            </div>

                    </Collapse>

                </div>
              )}
          </Collapse.Group>
         </fieldset>

         <p className="text-lg font-semibold">Total Cost: <span className="text-lg font-normal">{orderRequest.total_price} baht </span> </p>
              <ul className="mt-2">
              <li> <span className="font-semibold">Approved by:</span> {orderRequest.approval_by && orderRequest.approval_by.map((item, k) =>
                  <span key={k}>{item.role}</span>)}</li>
                {console.log("hi")}
                <li> <span className="font-semibold">Comment by:</span> {orderRequest.comment_by && orderRequest.comment_by.map((item, k) =>

                  <span key={k}>{item.role}, {item.user}: {item.comment}, {item.user == email && <button onClick={e => handleDeleteComment(item.id)}> Delete </button>} </span>)}</li>
              </ul>

         {(type=="view_details")
            ?
              <div className="flex justify-center mt-4">
                <Button auto flat  onClick={closeHandler} className="bg-primary-color text-white">Close</Button>
              </div>
            :
              <div >

               <div className="flex justify-center mb-4 gap-24">
                  <Button auto bordered color="error"onClick={e => handleReject(orderRequest.id)} className="text-red-500"> Reject</Button>
                  <Button auto bordered color="primary"  onClick={e => handleApprove(orderRequest.id)}> Approve </Button>
                </div>
              
                <Textarea bordered fullWidth
                color="primary"
                name="reason" 
                placeholder="Comment regarding the order request" 
                onChange={(e) => setComment(e.target.value)}/>
              <div className="flex justify-center mt-3">
                  <Button auto className="bg-primary-color" onClick={e => handleComment(comment, orderRequest.id)}>Save Comment</Button>
              </div>
                
              </div>
                }
               
           
          </form>
         
        </Modal.Body>
      </Modal>
    </>
  );
}
