
import { Modal, Button, Text, Input, Radio, Spacer, Textarea, Collapse } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher, createLog, useInfo } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";


export default function AddCodeNameModal({visible, closeHandler, code_list }) {
    const { mutate } = useSWRConfig()

    const handleAddInfo = async event => {
      event.preventDefault();
      const formData = getFieldsValues(event, ["name", "code", "codeType"])
      
      fetcher("/api/common/code_name/create", formData).then(d => {
        
        mutate("/api/info")
      })
      createLog("GeneralInfo", "Create: new short_code", "Create")
      closeHandler()
    }


  

  return (
    <>
      <Modal
        closeButton

        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="500px"
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>Creating General Information</Text>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddInfo} className="flex flex-col gap-4">
                <div>
                    <p className="text-primary-color text-lg">Code Name:  </p>
                    <span >includes Location and Employee Code </span>
                </div>

                

                <Collapse.Group>
                    <Collapse key="1" title="List of Locations">
                      <div className="grid grid-cols-3 gap-4">
                        {code_list?.locations?.map(item => <ul className="text-sm">{item} </ul>)}
                      </div>
                    </Collapse>

                    <Collapse key="2" title="List of Departments">
                    <div className="grid grid-cols-3 gap-4">
                        {code_list?.departments?.map(item => <ul className="text-sm">{item} </ul>)}
                      </div>
                    </Collapse>
                  
                    <Collapse key="3" title="List of Employee">
                    <div className="grid grid-cols-3 gap-4">
                        {code_list?.employees?.map(item => <ul className="text-sm">{item} </ul>)}
                      </div>
                    </Collapse>
                  
                  </Collapse.Group>
                  
               
            <div className="flex flex-row gap-4 mt-4">
                <div className="w-full">
                  <label htmlFor="location" className="  text-primary-color text-md font-normal">1. Type/Category: </label>
                  <select required  name="type" className="w-full mt-2 form-select appearance-none block p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                  focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="department selection">
                      <option> Select type / category </option>
                      {code_list?.code_types?.map((ct, num) => 
                          <option key={num} >{ct}</option>)}
                  </select>

                </div>
                    <Input  bordered fullWidth
                        label="2. Label"
                        color="primary" size="lg"
                        type="text" name="name" placeholder="Item Name"
                    />
            </div>
                        <div className="flex justify-end">
                        <Button auto flat  onClick={closeHandler} className="text-error-color " >Close</Button>
                        <button className="primary-btn" type="submit">Add Info</button>
                        </div>


           
          </form>

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
