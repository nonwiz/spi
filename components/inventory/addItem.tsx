import { getFieldsValues, fetcher } from "lib/fetcher"
import { useSWRConfig } from "swr"

const FormAddInventory = ({ props }) => {
  const { mutate } = useSWRConfig()
  const { location } = props;

  const handleAddInventory = async (event) => {
    event.preventDefault()
    console.log("Handle add inventory called")
    const formData = getFieldsValues(event, ["name", "location", "description", "price", "order_date", "depreciation", "quantity", "quantity_unit"])
    console.log({ formData });
    fetcher("/api/inventory/addItem", formData).then((d) => {
      console.log(d)
      mutate("/api/inventory")
    })
  }

  return (
    <>
      <form onSubmit={handleAddInventory}>
        <label> Item Name </label>
        <input type="text" name="name" placeholder="Item Name" />
        <label> Order date </label>
        <input type="date" name="order_date" />
        <label> Depreciation date </label>
        <input type="date" name="depreciation" />

        <input type="number" step="0.01" name="price" placeholder="Item price" />
        <input type="number" step="0.01" name="quantity" placeholder="Item Quantity" />
        <input type="text" name="quantity_unit" placeholder="Item Quantity Unit" />
        <textarea name="description" placeholder="item description" />

        <input type="hidden" name="location" value={location} />

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
