import { useAdmin } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from 'react'
import BuildingListTable from "@/components/admin/tables/BuildingListTable";
import SearchBox from "@/components/admin/SearchBox";
import UpdateBuildingModal from "@/components/admin/UpdateBuildingModal";
import LoadingIcon from "@/components/loadingIcon";


export default function buildingList() {
  const { data: session } = useSession();
  const { data, isLoading } = useAdmin();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");

  if (isLoading) return  <LoadingIcon />
  if (session?.user?.role != "admin") return <p> Unauthorized </p>
  
  
  const handler = () =>{
    setVisible(true);
    setType("create_building");
  }

  const closeHandler = () => {
    setVisible(false);
    setType("none")
  };

  return (
    <div>
      <UpdateBuildingModal
          type={type}
          visible={visible} 
          closeHandler={closeHandler} 
          building={data.building}/>
          
       <div className="flex flex-row gap-12 my-6 ">
       <button onClick={handler} className="primary-btn">Add New Building</button>
       <SearchBox /> 

       </div>
      <div className="">
        {/* <h2>List of Users</h2> */}
       
          { data?.buildings && data?.zones && <BuildingListTable building={data.buildings} zones={data.zones} />  }
       
        </div>
    </div>
  );
}