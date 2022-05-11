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

  if (isLoading) return  <LoadingIcon />

  

  const returnLocationItems = (location) => {

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

        {(data.items && data.items?.length >0)
          ?
            <ItemsListTable items={data.items} locations={data.locations} />
          :
            <EmptyState msg={"The Inventory is empty"} />}
        </div>
      </div>
 
    </>
  )
}
