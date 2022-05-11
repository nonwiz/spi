import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";



const FormCreateDepartment = () => {
  const { mutate } = useSWRConfig();

  const handleCreateDepartment = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["name", "budget"])
    fetcher("/api/admin/department/create", formData).then(d => {

      mutate("/api/admin")
    })

  }


  return <>
        <h2> Creating Department</h2>
        <form onSubmit={handleCreateDepartment}>
        <input type="text" placeholder="name" name="name" />
        <input type="number" step="0.01" placeholder="budget in baht" name="budget" />
           <input type="submit" value="Create" className="p-2 border-2 border-solid m-2" />
        </form>
 
  </>
}

export default FormCreateDepartment;
