import { useAdmin } from "lib/fetcher";
import { useSession } from "next-auth/react";
// import PaginatedTable from "@/components/admin/PaginatedTable";
import LocationListTable from "@/components/admin/tables/LocationListTable";
// import PopupModal from "@/components/admin/PopupModal";
// import SearchBox from "@/components/admin/SearchBox";


export default function locationList() {
  const { data: session } = useSession();
  const { data, isLoading } = useAdmin();

 
  // if (isLoading) return <p> Loading ... </p>
  // if (session?.user?.role != "admin") return <p> Unauthorized </p>
  return (
    <div>
       <div className="flex flex-row gap-16 my-6 ">
       <button className="flex py-2 px-4 text-sm rounded-lg border border-primary-color gap-x-2.5 bg-primary-color text-white hover:shadow-lg hover:shadow-blue-700/20">Add New Location</button>
      {/* <SearchBox /> */}

       </div>
      <div className="">
        {/* <h2>List of Users</h2> */}
       
          { data?.locations && data?.zones && <LocationListTable location={data.locations} zones={data.zones} />  }
       
        </div>
    </div>
  );
}