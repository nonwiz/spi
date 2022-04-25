
import { Modal, Button, Text, Input,  Radio, Spacer } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";


export default function UpdateLocationModal({visible, closeHandler, location, zones}) {

  const { mutate } = useSWRConfig();



  const handleUpdateLocation = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["floor", "description", "zone", "room_number"])
    fetcher("/api/admin/location/update", formData).then(d => {
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
          <Text id="modal-title" size={18}> Location Details (Update) </Text>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateLocation} className="flex flex-col gap-4">
            <Input
              readOnly bordered fullWidth 
              size="lg"
              label="Full Name"  
              color="primary" 
              initialValue={location?.zone} contentLeft={<Mail fill="currentColor" />} className="bg-gray-100"
            />
            <Input readOnly bordered fullWidth 
              color="primary" 
              size="lg"
              label="Email"  
              name="email" 
              initialValue={location?.floor} contentLeft={<Mail fill="currentColor" />} className="bg-gray-100 "
            />

            <div className="mb-3 xl:w-88">
                <Text color="primary" className="mb-1">Role (click to change zone)</Text>
                  <select name="zone" className="form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                  focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="Role selection">
                      <option defaultValue="Customer">{location?.zone}</option>
                      {zones && zones.map((zone, id) => <option key={id}>{zone}</option>)}  
               
                  </select>
              </div>

              <div className="flex justify-center">
                <Button auto flat color="error" onClick={closeHandler}>
                  Cancel
                </Button>
                <Button auto className="bg-primary-color" type="submit">
                  Update and Save
                </Button>

              </div>
          </form>
         
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
