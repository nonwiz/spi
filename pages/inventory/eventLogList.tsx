import { useAdmin, useInfo,useInventory,useLog } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from 'react'
import LocationListTable from "@/components/admin/tables/LocationListTable";
import SearchBox from "@/components/admin/SearchBox";
import UpdateLocationModal from "@/components/admin/UpdateLocationModal";
import LoadingIcon from "@/components/loadingIcon";
import { EmptyState } from "@/components/EmptyState";
import LogListTable from "@/components/admin/tables/LogListTable";
import Link from "next/link";


export default function eventLogList() {
  const { data: log, isLoading: logLoading } = useLog();


  if (logLoading) return  <LoadingIcon />
   return (

    <>
      <div>

          <div className=" mt-8 gap-8">
              <div className="rounded-lg ">
                <h2>Recent Activities (Event Log)</h2>
                {(log.logs)
                ?<LogListTable logs={log.logs.reverse()} />
                :<EmptyState msg={"user table is empty"} />}
              </div>
                  
          </div>
      </div>

     

</>

  )
}