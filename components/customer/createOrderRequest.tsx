import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";



const FormCreateOrderRequest = () => {
  const { mutate } = useSWRConfig();

  const handleCreateOrderRequest = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["user", "id"])
    fetcher("/api/admin/department/addUser", formData).then(d => {
      console.log(d)
      mutate("/api/admin")
    })

  }


  return <>
        <h2> Form create order request</h2>
        <form onSubmit={handleCreateOrderRequest}>

           <input type="submit" value="Request" className="p-2 border-2 border-solid m-2" />

        </form>
 
  </>
}

export default FormCreateOrderRequest;
