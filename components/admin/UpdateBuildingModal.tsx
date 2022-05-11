
import { Modal, Button, Text, Input,  Radio, Spacer, Textarea  } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";


export default function UpdateBuildingModal({type, visible, closeHandler, building}) {

  const { mutate } = useSWRConfig();

  const handleUpdateBuilding = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["id", "name"])
    fetcher("/api/admin/building/update", formData).then(d => {

      mutate("/api/admin")
    })
    closeHandler()
  }

  const handleCreateBuilding = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["name"])
    fetcher("/api/admin/building/create", formData).then(d => {

      mutate("/api/admin")
    })

    closeHandler()
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
          <Text id="modal-title" size={18}> {(type=="view_details")?"Building Details":(type=="create_location")?"Add New Location":"Building Details (Update)"} </Text>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(type=="create_building")?handleCreateBuilding:handleUpdateBuilding} className="flex flex-col gap-4">
              <input hidden  name="id" defaultValue={building?.id}/>
        
              <Input  bordered fullWidth readOnly={(type=="view_details")?true:false}
                color="primary" 
                size="lg"
                label="Building Name"  
                name="name"
                initialValue={building?.name} contentLeft={<Mail fill="currentColor" />} 
              />

              <div className="flex justify-center mt-3">
                {(type=="view_details")
                  ?
                    <Button auto flat  onClick={closeHandler} className="bg-primary-color text-white">Close</Button>
                  :
                    <div className="flex justify-center">
                      <Button auto flat  onClick={closeHandler} className="text-red-500">Cancel</Button>
                      <Button auto className="bg-primary-color" type="submit">{(type=="create_building")?"Add Building":"Update and Save"}</Button>
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
