import {
  Modal,
  Button,
  Text,
  Input,
  Radio,
  Spacer,
  Textarea,
} from "@nextui-org/react"
import { Mail } from "@/components/admin/icons/Mail"
import { Password } from "@/components/admin/icons/Password"
import { getFieldsValues, fetcher } from "lib/fetcher"
import { useSWRConfig } from "swr"

export default function UpdateDepartmentModal({
  type,
  visible,
  closeHandler,
  department,
}) {
  const { mutate } = useSWRConfig()
  console.log("DEPARTMENT", department)

  const createLog = (model, message, operation) => {
    fetcher("/api/common/log", { model, message, operation }).then((d) => {
      console.log(d)
    })
  }

  const handleUpdateDepartment = async (event) => {
    event.preventDefault()
    const formData = getFieldsValues(event, ["id", "name", "dean_email"])

    try {
      fetcher("/api/admin/department/update", formData).then((d) => {
        console.log(d)
        mutate("/api/info")
      })

      if (formData.name != department?.name) {
        createLog(
          "Department",
          `Updated from name to ${formData.name}`,
          "Update"
        )
      }
      if (formData.dean_email != department?.dean_email) {
        createLog(
          "Department",
          `Updated from dean to ${formData.dean_email}`,
          "Update"
        )
      }

      closeHandler()
    } catch (error) {
      console.log("an error while updating")
    }
  }

  const handleCreateDepartment = async (event) => {
    event.preventDefault()
    const formData = getFieldsValues(event, ["name", "dean_email"])
    fetcher("/api/admin/department/create", formData).then((d) => {
      console.log(d)
      mutate("/api/info")
    })
    createLog("Department", `Create new department ${formData.name}`, "Create")

    closeHandler()
  }

  return (
    <>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {" "}
            {type == "view_details"
              ? "Department Details"
              : type == "create_location"
              ? "Add New Location"
              : "Department Details (Update)"}{" "}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={
              type == "create_department"
                ? handleCreateDepartment
                : handleUpdateDepartment
            }
            className="flex flex-col gap-4"
          >
            <input hidden name="id" defaultValue={department?.id} />

            <Input
              bordered
              fullWidth
              readOnly={type == "view_details" ? true : false}
              color="primary"
              size="lg"
              label="Department Name"
              name="name"
              initialValue={department?.name}
              contentLeft={<Mail fill="currentColor" />}
            />

            <Input
              bordered
              fullWidth
              readOnly={type == "view_details" ? true : false}
              color="primary"
              size="lg"
              label="Dean Email"
              name="dean_email"
              type="text"
              placeholder="dan@apiu.edu"
              initialValue={department?.dean_email}
              contentLeft={<Mail fill="currentColor" />}
            />

            <div className="flex justify-center mt-3">
              {type == "view_details" ? (
                <Button
                  auto
                  flat
                  onClick={closeHandler}
                  className="bg-primary-color text-white"
                >
                  Close
                </Button>
              ) : (
                <div className="flex justify-center">
                  <Button
                    auto
                    flat
                    onClick={closeHandler}
                    className="text-red-500"
                  >
                    Cancel
                  </Button>
                  <Button auto className="bg-primary-color" type="submit">
                    {type == "create_department"
                      ? "Add Department"
                      : "Update and Save"}
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}
