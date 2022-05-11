import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";



const FormCreateLocation = ({zones}: {zones: string[]}) => {
  const { mutate } = useSWRConfig();

  const handleCreateLocation = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["floor", "description", "zone", "room_number"])
    fetcher("/api/admin/location/create", formData).then(d => {

      mutate("/api/admin")
    })

  }


  return <>
        <h2> Creating Location and Inventory </h2>
        <form onSubmit={handleCreateLocation}>
        <input type="text" placeholder="floor" name="floor" />
        <textarea placeholder="description" name="description" />
        <input type="text" placeholder="room_number" name="room_number" />
          <select name="zone">
            {zones.map((zone, id) => <option key={id}>{zone}</option>)}
          </select>
            <input type="submit" value="Create" className="p-2 border-2 border-solid m-2" />
        </form>
 
  </>
}

export default FormCreateLocation;
