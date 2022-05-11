import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { Input  } from '@nextui-org/react';

const FormUpdateProfile= (
     {locations, departments, name}: {locations: string[], departments:object[], name: string}
    ) => {
  const { mutate } = useSWRConfig();
  const zones = {
    Information_Technology: "IT",
    Administration: "AD",
    Science: "SB",
  }
  const handleUpdateProfile = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["name", "department", "location"])
    
    fetcher("/api/customer/update", formData).then(d => {
      
      mutate("/api/customer")
    })

  }


  return (
        <>
              <h2> Creating Location and Inventory </h2>
              <form onSubmit={handleUpdateProfile}>
                <div className="flex flex-col justify-center gap-2">
                <Input name="name" label="Full name" placeholder="Chan Broset" initialValue={name} size="xl" required/>
                  <div class="flex flex-row gap-2">
                <select name="department" required className="form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                  focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="Zone selection">
                  <option value="">Department (select department)</option>
                        {departments?.map((item, id) => <option value={item.id} key={id}>{item.name}</option>)}
                  </select>
                 
                  <select name="location" required className="form-select appearance-none block w-full p-2.5 px-5 text-base font-normal text-gray-700 border-2 rounded-2xl transition ease-in-out m-0
                  focus:text-gray-700 focus:bg-white focus:border-primary-color focus:outline-none" aria-label="Room selection">
                    <option value=""> Room Number (click to select room)</option>
                        {locations?.map((item, id) => <option value={item.id} key={id}>{zones[item.zone]}{item.room_number}</option>)}
                  </select>
                  </div>
              </div>
                  <input type="submit" value="Update" className="p-2 border-2 border-solid m-2" />
              </form>
 
  </>
)}

export default FormUpdateProfile;
