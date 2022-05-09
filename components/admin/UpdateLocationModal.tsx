
import { Modal, Button, Text, Input,  Radio, Spacer, Textarea  } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher, createLog } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useState } from "react";


export default function UpdateLocationModal({ type, visible, closeHandler, location, buildings }) {
  console.log(type, visible)
  const { mutate } = useSWRConfig();
  const [other, setOther] = useState(false);
  const [building, setBuilding] = useState(location?.building)


  const handleUpdateLocation = async event => {
    event.preventDefault();
    let formData = getFieldsValues(event, ["id", "floor", "description", "building", "room_number"])
    if (other) {
      const tmp = getFieldsValues(event, ["building1"])
      formData.building = tmp.building1;
    }


    fetcher("/api/admin/location/update", formData).then(d => {
      console.log(d)
      mutate("/api/info")
    })
    createLog("Location", `Update location ${location.short_code}$`, "Update")


    closeHandler()
  }

  const handleCreateLocation = async event => {
    event.preventDefault();
    let formData = getFieldsValues(event, ["floor", "description", "building", "room_number"])
    if (other) {
      const tmp = getFieldsValues(event, ["building1"])
      formData.building = tmp.building1;
    }

    fetcher("/api/admin/location/create", formData).then(d => {
      console.log(d)
      mutate("/api/info")
    })

    createLog("Location", `Add new location ${formData.building}${formData.room_number}`, "Create")

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
          <Text id="modal-title" size={18}> {(type=="view_details")?"Location Details":(type=="create_location")?"Add New Location":"Location Details (Update)"} </Text>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(type == "create_location") ? handleCreateLocation : handleUpdateLocation} className="flex flex-col gap-4">
            {type != "create_location" && <input type="hidden" name="id" value={location?.id}/>}
            <div className=" xl:w-88">
                <Text color="primary" className="mb-1">Building (Click to change building)</Text>
                  <select defaultValue={building} value={building} onChange={e => {e.target.value == "Other" ? setOther(true) : setOther(false); setBuilding(e.target.value)}} disabled={(type=="view_details")?true:false} name="building" className="form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                  focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="building selection">
                    <option>{location?.building ? location?.building : "Select Location"}</option>
                      {buildings && buildings.map((building, id) => <option key={id}>{building}</option>)}  
                      <option>Other</option>
                  </select>
              </div>
              {other && 
            <Input  bordered fullWidth readOnly={(type=="view_details")?true:false}
                color="primary" 
                size="lg"
                label="New Building"  
                name="building1"
                type="text"
                initialValue={"New building"}
              />
              }
              


            <div className="flex gap-12">
              <Input  bordered fullWidth readOnly={(type=="view_details")?true:false}
                color="primary" 
                size="lg"
                label="Floor"  
                name="floor"
                type="number"
             
                initialValue={location?.floor} contentLeft={<Mail fill="currentColor" />} 
              />

              <Input  bordered fullWidth readOnly={(type=="view_details")?true:false}
                color="primary" 
                size="lg"
                label="Room Number"  
                name="room_number"
                type="number"
                initialValue={location?.room_number} contentLeft={<Mail fill="currentColor" />} 
              />
            </div>
            <Textarea bordered  readOnly={(type=="view_details")?true:false}
              color="primary"
              name="description"
              label="Description"
              placeholder="enter location description "
              initialValue={location?.description}
            />

              <div className="flex justify-center mt-3">
                {(type=="view_details")
                  ?
                    <Button auto flat  onClick={closeHandler} className="bg-primary-color text-white">Close</Button>
                  :
                    <div className="flex justify-center">
                      <Button auto flat  onClick={closeHandler} className="text-red-500">Cancel</Button>
                      <Button auto className="bg-primary-color" type="submit">{(type=="create_location")?"Create Location":"Update and Save"}</Button>
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
