import Layout from "@/components/layout"
import { useAdmin, useLog,useInfo } from "lib/fetcher";
import { EmptyState } from "@/components/EmptyState";

import UserListTable from "@/components/admin/tables/UserListTable";
import StatsCards from "@/components/admin/StatsCards";
import LoadingIcon from "@/components/loadingIcon";
import EventLog from "@/components/admin/EventLog";
import Link from "next/link";


export default function Page() {
  const { data, isLoading } = useAdmin();
  const { data: info, isLoading: infoLoading } = useInfo();
  const { data: log, isLoading: logLoading } = useLog();
  

  if (isLoading || infoLoading || logLoading) return  <LoadingIcon />
   return (

    <>
      <div>
          <StatsCards users={data?.users} departments={info?.departments} locations={info?.locations} zones={data.zones} />
          <div className="flex flex-col lg:flex-row justify-between  mt-8 gap-8">
              <div className="rounded-lg lg:w-2/3">
                <h2>User Management</h2>
                {(data?.users && data?.roles)
                ?<UserListTable users={data?.users} roles={data?.roles} />
                :<EmptyState msg={"user table is empty"} />}
              </div>
              
              <div className="lg:w-2/6">
                <div className="flex justify-between items-center">
                  <h2>Recent Activities (Event Log)</h2>
                  <Link href="/admin/eventLogList">
                  <button className="flex py-1 px-4 text-sm rounded-lg border border-gray-700 gap-x-2.5  text-gray-700 hover:shadow-lg 0">View All</button>
                </Link>
                </div>
                <EventLog logs={log?.logs.reverse().slice(0,6)}/>
        
              </div>
          </div>
      </div>

     

      {/* <div className="p-4">
          
        <FormUpdateLocation zones={data.zones} locations={data.locations} />


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
