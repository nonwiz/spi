import Layout from "@/components/layout"
import { useAdmin } from "lib/fetcher";
import { useSession } from "next-auth/react";

import FormCreateLocation from "@/components/admin/createLocation";
import FormCreateDepartment from "@/components/admin/createDepartment";
import FormUpdateLocation from "@/components/admin/updateLocation";
import FormUpdateDepartment from "@/components/admin/updateDepartment";
import FormAddUserToDepartment from "@/components/admin/addUserToDepartment";
import FormCreateOrderType from "@/components/admin/createOrderType";
import PageHeader from "@/components/pageHeader";
import UserListTable from "@/components/admin/tables/UserListTable";
import StatsCards from "@/components/admin/StatsCards";


export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = useAdmin();

  if (isLoading) return <p> Loading ... </p>
  if (session?.user?.role != "admin") return <p> Unauthorized </p>

   return (

    <>
      <div>
          <StatsCards users={data.users} departments={data.departments} locations={data.locations} />
          <div className="flex flex-col lg:flex-row justify-between  mt-8 gap-8">
              <div className=" rounded-lg lg:w-2/3">
                <h2>User Management</h2>
                {data?.users && data?.roles && <UserListTable users={data.users} roles={data.roles} />}
              </div>
              <div className="lg:w-2/6">
                <h2>Recently Activities</h2>
                {/* <RecentActivities /> */}
              </div>
          </div>
      </div>

     

      {/* <div className="p-4">
          

        <h2> List of Location </h2>
        {data && <div>
          <ul>
            {data.locations.map((item, id) => <li key={id}>Room: {item.room_number} | {item.zone} - {item.description} </li>)}
          </ul>
        </div>}
        <hr />
        <FormCreateLocation zones={data.zones} />

        <FormUpdateLocation zones={data.zones} locations={data.locations} />

        <hr />
        <h2 className="mt-10"> List of Department</h2>
        {data && <div>
          <ul>
            {data.departments.map((item, id) => <li key={id}>Department: {item.name} | {item.budget} </li>)}
          </ul>
        </div>}
        <hr />
        <FormCreateDepartment />
        <hr />
        <h2> Update Department Budget </h2>
        <FormUpdateDepartment departments={data.departments} />
        <FormAddUserToDepartment users={data.users} departments={data.departments} />
        <hr />
        <FormCreateOrderType orderTypes={data.orderTypes} />
        


      </div> */}
</>

  )
}
