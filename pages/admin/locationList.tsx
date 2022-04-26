import { useAdmin } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from 'react'
import LocationListTable from "@/components/admin/tables/LocationListTable";
import SearchBox from "@/components/admin/SearchBox";
import UpdateLocationModal from "@/components/admin/UpdateLocationModal";


export default function locationList() {
  const { data: session } = useSession();
  const { data, isLoading } = useAdmin();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");

  if (isLoading) return <p> Loading ... </p>
  if (session?.user?.role != "admin") return <p> Unauthorized </p>
  
  
  const handler = () =>{
    setVisible(true);
    setType("create_location");
    closeHandler();
  }

  const closeHandler = () => {
    setVisible(false);
    setType("none")
  };

  return (
    <div>
      <UpdateLocationModal
          type={type}
          visible={visible} 
          closeHandler={closeHandler} 
          location
          zones={data.zones}/>
          
       <div className="flex flex-row gap-12 my-6 ">
       <button onClick={handler} className="flex py-2 px-4 text-sm rounded-lg border border-primary-color gap-x-2.5 bg-primary-color text-white hover:shadow-lg hover:shadow-blue-700/20">Add New Location</button>
       <SearchBox /> 

       </div>
      <div className="">
        {/* <h2>List of Users</h2> */}
       
          { data?.locations && data?.zones && <LocationListTable location={data.locations} zones={data.zones} />  }
       
        </div>
    </div>
  );
}