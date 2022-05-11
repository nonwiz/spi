import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";



const FormUpdateDepartment = ({departments}) => {
  const { mutate } = useSWRConfig();

  const handleUpdateDepartment = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["budget", "id"])
    fetcher("/api/admin/department/update", formData).then(d => {
 
      mutate("/api/admin")
    })

  }


  return <>
        <h2> Updating item role </h2>
        <form onSubmit={handleUpdateDepartment}>
          <select name="id">
            {departments.map((item, id) => 
              <option key={id} value={item.id}>{item.name}</option>
            )}
          </select>

        <input type="number" placeholder="1000.01" step="0.01" name="budget" />
           <input type="submit" value="Update" className="p-2 border-2 border-solid m-2" />

        </form>
 
  </>
}

export default FormUpdateDepartment;
