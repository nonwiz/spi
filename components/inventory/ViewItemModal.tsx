
import { Modal, Button, Text, Input, Radio, Spacer, Textarea, Collapse } from "@nextui-org/react";
import { Mail } from "@/components/admin/icons/Mail";
import { Password } from "@/components/admin/icons/Password";
import { getFieldsValues, fetcher, createLog, useInfo } from "lib/fetcher";
import { useSWRConfig } from "swr";
import { useEffect, useState } from "react";


export default function ViewItemModal({visible, closeHandler, item, location }) {
    const { mutate } = useSWRConfig()

   
  return (
    <>
      <Modal
        closeButton

        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="500px"
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>Creating General Information</Text>
        </Modal.Header>
        <Modal.Body>
          <p>{item.name}</p>
          <p>{item.quantity}</p>
          <p>{item.quantity_unit}</p>
          <p>{item.unit_price}</p>
          <p>{item.type}</p>
          <p>{item.name}</p>
          <p>{item.name}</p>


        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
