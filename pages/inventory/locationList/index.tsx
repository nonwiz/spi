import { useInventory } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import ItemsListTable from "@/components/inventory/tables/ItemsListTable";
import SearchBox from "@/components/admin/SearchBox";
import LocationListTable from "@/components/inventory/tables/LocationListTable";

export default function LocationList() {
  const { data: session } = useSession();
  const { data, isLoading } = useInventory();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  if (isLoading) return <p> Loading ... </p>
  const createOrder = () =>{
    setVisible(true);
  }


  const closeHandler = () => {
    setVisible(false);
  };

  return (
      <>
       <div className="my-8 flex flex-row gap-6 w-full items-center">
        <button className="primary-btn"> Create Moving Request</button> 
        <SearchBox />
      </div>

      <div className="">
        <div className=" rounded-lg ">
            <h2>List of Locations</h2>
            {(data.locations)
              ?
                <LocationListTable locations={data.locations} />
              :
                <EmptyState msg={"No Pending Order Request"} />}
           

            </div>
      </div>
      </>
   )
}
