import Layout from "@/components/layout"
import FormAddInventory from "@/components/inventory/addItem"
import { useInventory, useInfo, fetcher, getFieldsValues, createLog } from "lib/fetcher"
import { useSession } from "next-auth/react"
import { useState } from "react"
import FormMoveUser from "@/components/inventory/moveUser"
import StatsCardsInventory from "@/components/inventory/StatsCardsInventory"
import { EmptyState } from "@/components/EmptyState"
import ItemsListTable from "@/components/inventory/tables/ItemsListTable"
import LoadingIcon from "@/components/loadingIcon"
import SearchBox from "@/components/admin/SearchBox"
import AddItemModal from "@/components/inventory/AddItemModal"
import { useSWRConfig } from "swr"
import AddCodeNameModal from "@/components/inventory/AddCodeNameModal"

export default function Page() {
  const { data, isLoading } = useInventory()
  const { data: info, isLoading:infoLoading } = useInfo()
  const [visible, setVisible] = useState(false);
  const { mutate } = useSWRConfig();

  if (isLoading || infoLoading) return  <LoadingIcon />

console.log(data.code_list)
  

  
  const handler = () => {setVisible(true);}
  const closeHandler = () => {setVisible(false);};

  return (
    <>

    <AddCodeNameModal
        visible={visible}
        closeHandler={closeHandler}
        code_list={data?.code_list}
        code_types={data?.code_types}
      />
        <div className="flex flex-row gap-12 my-6 items-center ">
        <button onClick={handler} className="flex py-2 px-4 text-sm rounded-lg border border-primary-color gap-x-2.5 bg-primary-color text-white hover:shadow-lg hover:shadow-blue-700/20">Add New</button>
        <SearchBox msg={"search for items"}/>

      </div>
        <div className="mt-4">
        <div className="rounded-lg ">
          <h2>Recently Added item </h2>
          <hr />
          <li> Name | Code | Code Type </li>
          {data?.code_list.map((co, ind) => 
          <li>{co.name} | {co.code } | {co.codeType}</li> 
          )}
        </div>
      </div>
 
    </>
  )
}

