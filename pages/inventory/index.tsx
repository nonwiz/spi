import Layout from "@/components/layout"
import FormAddInventory from "@/components/inventory/addItem"
import { useInventory } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = useInventory();
  const [sItem, setSelected] = useState(0)
  const zones = {
    "Information_Technology": "IT",
    "Administration": "AD",
    "Science": "SB"
  }

  if (isLoading) return <p> Loading ... </p>

  console.log(data.locations)

  const returnRoom = (locations, id) => {
    const tmp = locations.find(ele => ele.id == id);
    return (`${zones[tmp.zone]}${tmp.room_number}`);
  }


  return (
    <Layout>
      <div className="p-4">
        <div className="p-2 my-4">
          <h1>Inventory Master </h1>
          <br />

          <h2> Order Types </h2>
          <hr />
          <ul>
            {data && data.orderTypes.map((item, id)  => (
              <li key={id}> {item.type} </li>
            ))}
            </ul>

<br />
          <h2> Location List </h2>
          <hr />
          <ul>
            {data && data.locations.map((item, id)  => (
              <li key={id}> {item.zone} {item.room_number} </li>
            ))}
            </ul>
            <br />

            <h2> List of item </h2>
            <hr />
          <ul>
            {data && data.items.map((item, id)  => (
              <li key={id}> {item.name} {returnRoom(data.locations, item.location_id) 
               } </li>
            ))}
            </ul>
            <br />


            <h2> Add Item </h2>
            <hr />
<FormAddInventory props={{'locations': data.locations, 'zones': zones}}/>

       </div>
      </div>
    </Layout>
  )
}

