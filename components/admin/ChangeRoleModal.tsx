
import { Modal, Button, Text, Input,  Radio, Spacer } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher } from "lib/fetcher";


export default function ChangeRoleModal({visible, closeHandler, user, type}) {
  const updateUser = (e) => {
    e.preventDefault();
    const formData = getFieldsValues(event, ["email", "role"])
    console.log("hello world", formData)
  }
  return (
    <>
      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}> User Details </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            readOnly
            bordered
            fullWidth
            color="primary"
            size="lg"
            label="Full Name" 
            initialValue={user?.name}
            contentLeft={<Mail fill="currentColor" />}
            className="bg-gray-100"
          />
          <Input
            readOnly
            bordered
            fullWidth
            color="primary"
            size="lg"
            label="Email" 
            name="email"
            initialValue={user?.email}
            contentLeft={<Mail fill="currentColor" />}
            className="bg-gray-100"
          />
       
          <Text color="primary" className="mb-1">Role (click to change role)</Text>
          <form className="flex justify-center">
              <div className="mb-3 xl:w-96">
                  <select name="role" className="form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                  focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="Role selection">
                      <option defaultValue="Customer">{user?.role}</option>
                      <hr></hr>
                      <option value="finance_Officer">Customer</option>
                      <option value="department_head">department Head</option>
                      <option value="finance_officer">Finance Officer</option>
                      <option value="inventory_officer">Inventory Officer</option>
                      <option value="purchasing_officer">Purchasing Officer</option>
                      <option value="admin">Admin</option>
                  </select>
              </div>
          </form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button auto className="bg-primary-color" onClick={closeHandler}>
            Update and Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
