import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";



const FormAddUserToDepartment = ({departments, users} : {departments: object[], users: object[]}) => {
  const { mutate } = useSWRConfig();

  const handleAddUserToDepartment = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["user", "id"])
    fetcher("/api/admin/department/addUser", formData).then(d => {
      console.log(d)
      mutate("/api/admin")
    })

  }


  return <>
        <h2> Form add User to Department </h2>
        <form onSubmit={handleAddUserToDepartment}>
          <select name="id">
            {departments.map((item, id) => 
              <option key={id} value={item.id}>{item.name}</option>
            )}
          </select>
        <input list="users" name="user" id="user" />
      <datalist id="users">
{users.map((item, id) => <option key={id} value={item.email}> {item.email} </option>)}
  </datalist>

           <input type="submit" value="Add" className="p-2 border-2 border-solid m-2" />

        </form>
 
  </>
}

export default FormAddUserToDepartment;
