
import { Modal, Button, Text, Input,  Radio, Spacer } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import RoleSelection from "./RoleSelection";


export default function PopupModal({visible, closeHandler}) {

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
          <Text id="modal-title" size={18}>
            User Details
         
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            readOnly
            bordered
            fullWidth
            color="primary"
            size="lg"
            label="Full Name" 
            initialValue="Dan M. Kazimoto"
            contentLeft={<Mail fill="currentColor" />}
          />
          <Input
            readOnly
            bordered
            fullWidth
            color="primary"
            size="lg"
            label="Email" 
            initialValue="201900162@my.apiu.edu"
            contentLeft={<Mail fill="currentColor" />}
          />
       
          <Text color="primary" className="mb-1">Role</Text>
          <RoleSelection />
          
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error"   onClick={closeHandler}>
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
