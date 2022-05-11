import { getFieldsValues, fetcher } from "lib/fetcher"
import { useSWRConfig } from "swr"

const FormMoveUser = ({ props }) => {
  const { mutate } = useSWRConfig()
  const { location } = props;

  const handleMoveUser = async (event) => {
    event.preventDefault()
    const formData = getFieldsValues(event, ["userId", "location"])
    fetcher("/api/inventory/location/moveUser", formData).then((d) => {
      
      mutate("/api/inventory")
    })
  }

  return (
    <>
      <form onSubmit={handleMoveUser}>
        <input type="hidden" name="location" value={location} />
        <input type="text" name="userId" placeholder="emailaddress" />

        <input
          type="submit"
          value="Add"
          className="p-2 border-2 border-solid m-2"
        />
      </form>
    </>
  )
}

export default FormMoveUser
