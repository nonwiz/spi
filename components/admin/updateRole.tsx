import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";



const FormUpdateRole = ({users, roles}) => {
  const { mutate } = useSWRConfig();

  const handleUpdateRole = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["email", "role"])
    fetcher("/api/admin/user/updateRole", formData).then(d => {
      console.log(d)
      mutate("/api/admin")
    })

  }


  return <>
        <h2> Updating User role </h2>
        <form onSubmit={handleUpdateRole}>
          <select name="email">
            {users.map((user, id) => 
              <option key={id}>{user.email}</option>
            )}
          </select>
          <select name="role">

            {roles.map((role, id) => <option key={id}>{role}</option>)}
          </select>
            <input type="submit" value="Update" className="p-2 border-2 border-solid m-2" />

        </form>
 
  </>
}

export default FormUpdateRole;
