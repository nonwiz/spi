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
    console.log({formData})
    fetcher("/api/customer/update", formData).then(d => {
      console.log(d)
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
          <select name="department" required>
            <option value="">Department</option>
                        {departments?.map((item, id) => <option value={item.id} key={id}>{item.name}</option>)}
                  </select>
                 
                  <select name="location" required>
                    <option value=""> Room Number </option>
                        {locations?.map((item, id) => <option value={item.id} key={id}>{zones[item.zone]}{item.room_number}</option>)}
                  </select>
                  </div>
              </div>
                  <input type="submit" value="Update" className="p-2 border-2 border-solid m-2" />
              </form>
 
  </>
)}

export default FormUpdateProfile;
