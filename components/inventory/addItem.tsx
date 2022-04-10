import { getFieldsValues, fetcher } from "lib/fetcher"
import { useSWRConfig } from "swr"

const FormAddInventory = ({ props }) => {
  const { mutate } = useSWRConfig()
  const { zones, locations } = props;

  const handleAddInventory = async (event) => {
    event.preventDefault()
    const formData = getFieldsValues(event, ["name", "location"])
    fetcher("/api/inventory/addItem", formData).then((d) => {
      console.log(d)
      mutate("/api/inventory")
    })
  }

  return (
    <>
      <h2> Inventory List  </h2>
     <h2> Creating Inventory </h2>
      <form onSubmit={handleAddInventory}>
        <input type="text" name="name" placeholder="Item Name" />
        <select name="location" id="locations">
          {locations.map((item, id) => (
            <option key={id} value={item.id}>
              {`${zones[item.zone]}${item.room_number}`}
            </option>
          ))}
        </select>
        <input
          type="submit"
          value="Add"
          className="p-2 border-2 border-solid m-2"
        />
      </form>
    </>
  )
}

export default FormAddInventory
