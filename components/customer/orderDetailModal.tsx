
import { Modal, Button, Text, Input, Collapse  } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";
import StyledStatus from "./StyledStatus";


export default function OrderDetailModal({type,visible, closeHandler, order}) {

  const { mutate } = useSWRConfig();

  const handleUpdateDepartment = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["budget", "name"])
    fetcher("/api/admin/department/update", formData).then(d => {
      
      mutate("/api/admin")
    })
    closeHandler()
  }

  const handleCancel = async orderId => {
    fetcher("/api/common/order/cancelled", {orderId}).then(d => {
      
      mutate("/api/customer")
    })

  }

  const handleCreateDepartment = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["id", "budget"])
    fetcher("/api/admin/department/create", formData).then(d => {
      
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
        width="550px"
      >
        <Modal.Header>
          <Text id="modal-title" size={18}> {(type=="view_details")?"Order Request Details":"Order Request Cancellation"} </Text>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(type=="create_department")?handleCreateDepartment:handleUpdateDepartment} className="flex flex-col gap-4">
              <input hidden  name="id" defaultValue={order?.id}/>
              <div className="flex flex-row gap-2">
            <p className="text-lg font-semibold">Order Status:</p>
           <div className="w-2/3">

            <StyledStatus status={`${order.approval_by?.length > 0 && order.order_status == "Pending"? `Pending (${order.approval_by.length}/2)` : order.order_status}`} /> 
           </div>
          </div>

          <fieldset className="border-2 rounded-lg mb-4">
            <legend className="pl-1 pr-4 font-semibold">Items:</legend> 
               <Collapse.Group  >
              {order && order.order_items?.map((item, num) =>
                <div className="" key={num}>
                    <Collapse key={num} title={`${item.name}`}>
                        <div  className ="flex flex-col gap-4 px-2">
                          <div className="flex flex-row gap-2">
                                    <Input  bordered fullWidth
                                    readOnly
                                    color="primary" 
                                    size="lg"
                                    type="text"
                                    label="Quantity Unit"  
                                    name={`quantity_unit-${num}`}
                                    initialValue ={item.quantity_unit}
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

          {(type=="view_details")?
              <Collapse.Group className="-ml-3" >
                      <Collapse title={(order.comment_by && order.comment_by.length>0)? `Comment (click to view ${order.comment_by.length} comments )`:"Comments (no comments were added)" } className="font-semibold">
                        <div className="flex flex-col gap-2">

                        {order.comment_by && order.comment_by.map((item, k) =>
                        
                            <p key={k} className="text-left flex flex-col ml-4" ><span className="flex flex-row justify-between -ml-4">{k +1}. {item.user} ({item.role}): </span> {item.comment}
                              
                            </p>
                        )} 
                        </div>
                      </Collapse>
                  </Collapse.Group>:
                  <div className="item-center  border-2 rounded-md p-4  ">
                    <p className="text-center text-xl text-error-color">&#128680; Are you sure you want to cancel this order request? &#128680;</p>
                  </div>
            }
            <div className="flex justify-center mt-3">
              {(type=="view_details")
                ?
                  <Button auto flat  onClick={closeHandler} className="bg-primary-color text-white">Close</Button>
                :
                  <div className="flex justify-center gap-12">
                    <Button auto bordered  onClick={closeHandler} className="text-primary-color border-2 border-primary-color">Close</Button>
                    <Button auto className="bg-error-color" type="button" onClick={() => handleCancel(order.id)}>Cancel Request</Button>
                  </div>
              }
            </div>


          </form>
         
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
