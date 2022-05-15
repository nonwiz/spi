import { fetcher, getFieldsValues, useAdmin, useInfo } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from 'react'
import LocationListTable from "@/components/admin/tables/LocationListTable";
import SearchBox from "@/components/admin/SearchBox";
import UpdateLocationModal from "@/components/admin/UpdateLocationModal";
import LoadingIcon from "@/components/loadingIcon";
import { EmptyState } from "@/components/EmptyState";


export default function locationList() {
  const { data: session } = useSession();
  const { data, isLoading } = useAdmin();
  const { data: info, isLoading: infoLoading } = useInfo();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  const [shortCode, setShortCode] = useState("")


  if (isLoading || infoLoading) return <LoadingIcon />
  
  if (session?.user?.role != "admin") return <p> Unauthorized </p>


  const handler = () => {
    setVisible(true);
    setType("create_location");
  }

  const closeHandler = () => {
    setVisible(false);
    setType("none")
  };

  const handleCreateLocation = async event => {
    event.preventDefault();
    const formData = getFieldsValues(event, ["floor", "description", "zone", "room_number"])
    fetcher("/api/admin/location/create", formData).then(d => {
      
    })

  }


  if (isLoading || infoLoading) return  <LoadingIcon />


  return (
    <div>
      <UpdateLocationModal
        type={type}
        visible={visible}
        closeHandler={closeHandler}
        location
        buildings={info.buildings}
        departments={info.departments}
      />

      <div className="flex flex-row gap-12 my-6 items-center ">
        <button onClick={handler} className="primary-btn">Add New Location</button>
       <div className="w-full lg:w-1/3">
             <div className=" relative text-gray-600">
                <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full" 
                  type="search" name="search" value={shortCode} onChange={(e) => setShortCode(e.target?.value.toLowerCase())} placeholder={"Search by short_code"} />
                <button type="submit" className=" absolute right-0  mr-4 border-0 outline-none">
                  <svg className="h-4 w-4 fill-current border-red-100" xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                    viewBox="0 0 56.966 56.966"  xmlSpace="preserve"
                    width="512px" height="512px">
                    <path
                      d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>

        </div>
       </div>

      </div>
      <div className="">

        {(info?.locations && info.locations?.length > 0)
          ?
          <LocationListTable location={info.locations.filter(item => item.short_code.toLowerCase().startsWith(shortCode))} />
          :
          <EmptyState msg={"No locations were added"} />}
      </div>
      <div>


      </div>
    </div>
  );
}
