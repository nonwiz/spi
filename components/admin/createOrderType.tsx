import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";



const FormCreateOrderType = ({orderTypes}) => {
  const { mutate } = useSWRConfig();

  const handleCreateOrderType = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["type"])
    fetcher("/api/admin/orderType/create", formData).then(d => {

      mutate("/api/admin")
    })

  }


  return <>
    <h2> List of order type </h2>
{orderTypes.map((item, id) => <li key={id}> {item.type} </li>)}
        <h2> Creating OrderType </h2>
        <form onSubmit={handleCreateOrderType}>
        <input type="text" placeholder="type" name="type" />
            <input type="submit" value="Create" className="p-2 border-2 border-solid m-2" />
        </form>
 
  </>
}

export default FormCreateOrderType;
