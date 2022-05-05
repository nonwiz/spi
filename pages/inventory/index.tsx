import Layout from "@/components/layout"
import FormAddInventory from "@/components/inventory/addItem"
import { useInventory } from "lib/fetcher"
import { useSession } from "next-auth/react"
import { useState } from "react"
import FormMoveUser from "@/components/inventory/moveUser"
import StatsCardsInventory from "@/components/inventory/StatsCardsInventory"
import { EmptyState } from "@/components/EmptyState"
import ItemsListTable from "@/components/inventory/tables/ItemsListTable"
import LoadingIcon from "@/components/loadingIcon"

export default function Page() {
  const { data: session } = useSession()
  const { data, isLoading } = useInventory()
  const [sLocation, setSelectedL] = useState(0)
  const zones = {
    Information_Technology: "IT",
    Administration: "AD",
    Science: "SB",
  }

  if (isLoading) return  <LoadingIcon />

  console.log("sata",{ data })

  const returnRoom = (locations, id) => {
    const tmp = locations.find((ele) => ele.id == id)
    return `${zones[tmp.zone]}${tmp.room_number}`
  }

  const returnLocationItems = (location) => {
    console.log(location.items)
    console.log("Return items within location", location);
    const items = location.items.map(item =>
      <li>{item.name}</li>);
    return items.length > 0 ? items : "No items within this location!";
  }

  return (
    <>
        <StatsCardsInventory items={data.items} />
        <div className="mt-4">
        <div className="rounded-lg ">
          <h2>Recently Added item </h2>

        {(data.items)
          ?
            <ItemsListTable items={data.items} locations={data.locations} />
          :
            <EmptyState msg={"No Pending Order Request"} />}
        </div>
      </div>

       <div className="p-4">
        <div className="p-2 my-4">
          <h1>Inventory Master </h1>
          <br />

          <h2> Order Types </h2>
          <hr />
          <ul>
            {data.orderTypes &&
              data.orderTypes.map((item, id) => (
                <li key={id}> {item.type} </li>
              ))}
          </ul>

          <br />
          <h2> Location List </h2>
          <hr />
          <ul>
            {data.locations &&
              data.locations.map((item, id) => (
                <li key={id}>
                  <button onClick={() => setSelectedL(id)}>{zones[item.zone]}{item.room_number}
                  </button>

                </li>
              ))}
          </ul>
          <br />
          <h2> Selected Location </h2>
          <hr />
          <li> {data.locations[sLocation].zone} {data.locations[sLocation].room_number}</li>
          <FormAddInventory
            props={{ location: data.locations[sLocation].id }}
          />
          <hr />
          <h2> Moving user </h2>

          <FormMoveUser
            props={{ location: data.locations[sLocation].id }}
          />


          <br />
          <h2> Current Location items </h2>
          <hr />
          <ul>
            {data &&
              returnLocationItems(data.locations[sLocation])
            }
          </ul>
          <br /> 


          <h2> List of item </h2>
          <hr />
          <ul>
            {data &&
              data.items.map((item, id) => (
                <li key={id}>
                  {" "}
                  {item.name} {returnRoom(data.locations, item.location_id)}{" "}
                </li>))}
          </ul>
          <br /> 


        </div>
      </div> 
    </>
  )
}
