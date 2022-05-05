
import { Modal, Button, Text, Input,  Radio, Spacer, Textarea  } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";


export default function UpdateDepartmentModal({type, visible, closeHandler, department}) {

  const { mutate } = useSWRConfig();

  const handleUpdateDepartment = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["budget", "id"])
    fetcher("/api/admin/department/update", formData).then(d => {
      console.log(d)
      mutate("/api/admin")
    })
    closeHandler()
  }

  const handleCreateDepartment = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["name", "budget"])
    fetcher("/api/admin/department/create", formData).then(d => {
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
      >
        <Modal.Header>
          <Text id="modal-title" size={18}> {(type=="view_details")?"Department Details":(type=="create_location")?"Add New Location":"Department Details (Update)"} </Text>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(type=="create_department")?handleCreateDepartment:handleUpdateDepartment} className="flex flex-col gap-4">
              <input hidden  name="id" defaultValue={department?.id}/>
        
              <Input  bordered fullWidth readOnly={(type=="view_details")?true:false}
                color="primary" 
                size="lg"
                label="Department Name"  
                name="name"
                initialValue={department?.name} contentLeft={<Mail fill="currentColor" />} 
              />

              <Input  bordered fullWidth readOnly={(type=="view_details")?true:false}
                color="primary" 
                size="lg"
                label="Department Budget (Thai Bhat)"  
                name="budget"
                type="number"
                step="0.01"
                placeholder="budget in baht"
                initialValue={department?.budget} contentLeft={<Mail fill="currentColor" />} 
              />
     
    
              <div className="flex justify-center mt-3">
                {(type=="view_details")
                  ?
                    <Button auto flat  onClick={closeHandler} className="bg-primary-color text-white">Close</Button>
                  :
                    <div className="flex justify-center">
                      <Button auto flat  onClick={closeHandler} className="text-red-500">Cancel</Button>
                      <Button auto className="bg-primary-color" type="submit">{(type=="create_department")?"Add Department":"Update and Save"}</Button>
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
