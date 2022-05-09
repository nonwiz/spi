
import { Modal, Button, Text, Input,  Radio, Spacer } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";


export default function ChangeRoleModal({visible, closeHandler, user, type, roles}) {

  const { mutate } = useSWRConfig();
  const handleUpdateRole = async event => {
    event.preventDefault();
    console.log("updated user role")
    const formData = getFieldsValues(event, ["email", "role"])
    fetcher("/api/admin/user/updateRole", formData).then(d => {
      console.log(d)
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
          <Text id="modal-title" size={18}>{(type=="view_details")?"User Details":"User Details (Update)"} </Text>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateRole} className="flex flex-col gap-4">
            <Input
              bordered fullWidth readOnly={(type=="view_details")?true:false}
              size="lg"
              label="Full Name"  
              color="primary" 
              initialValue={user?.name} contentLeft={<Mail fill="currentColor" />} className="bg-gray-100"
            />
            <Input bordered fullWidth readOnly={(type=="view_details")?true:false}
              color="primary" 
              size="lg"
              label="Email"  
              name="email" 
              initialValue={user?.email} contentLeft={<Mail fill="currentColor" />} className="bg-gray-100 "
            />

            <div className="mb-3 xl:w-88">
                <Text color="primary" className="mb-1">Role (click to change role)</Text>
                  <select disabled={(type=="view_details")?true:false} name="role" className="form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                  focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="Role selection">
                      <option defaultValue="Customer">{user?.role}</option>
                      {roles && roles.map((role, id) => <option key={id}>{role}</option>)}  
               
                  </select>
              </div>

              <div className="flex justify-center">
                {(type=="view_details")
                  ?
                    <Button auto flat  onClick={closeHandler} className="bg-primary-color text-white">Close</Button>
                  :
                    <div className="flex justify-center">
                      <Button auto flat  onClick={closeHandler} className="text-red-500">Cancel</Button>
                      <Button auto className="bg-primary-color" type="submit">Update and Save</Button>
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
