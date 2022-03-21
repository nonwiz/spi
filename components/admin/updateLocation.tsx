import { getFieldsValues, fetcher } from "lib/fetcher";
import { useSWRConfig } from "swr";



const FormUpdateLocation = ({zones, locations}: {zones: string[], locations: object[]}) => {
  const { mutate } = useSWRConfig();

  const handleUpdateLocation = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["floor", "description", "zone", "room_number"])
    fetcher("/api/admin/location/update", formData).then(d => {
      console.log(d)
      mutate("/api/admin")
    })

  }


  return <>
        <h2> Update Location and Inventory </h2>
        <form onSubmit={handleUpdateLocation}>
      <label>Target location </label>
           <select name="location">
            {locations.map((item, id) => <option key={item.id}>{item.room_number} | {item.zone}</option>)}
          </select>
      <hr />
      <label> New information </label>
      <br />
        <input type="text" placeholder="floor" name="floor" />
        <textarea placeholder="description" name="description" />
          <select name="zone">
            {zones.map((zone, id) => <option key={id}>{zone}</option>)}
          </select>
        <input type="text" placeholder="room_number" name="room_number" />
           <input type="submit" value="Update" className="p-2 border-2 border-solid m-2" />
        </form>
 
  </>
}

export default FormUpdateLocation;
