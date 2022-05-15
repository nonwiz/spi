import Layout from "@/components/layout"
import { useDepartmentHead, useInfo } from "lib/fetcher";
import { useSession  } from "next-auth/react";
import { useState } from "react";
import { fetcher } from "lib/fetcher"
import { useSWRConfig } from "swr"
import PendingRequestTable from "@/components/purchase/table/PendingRequestTable";
import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";


export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = useDepartmentHead();
  const { data: info, isLoading: infoLoading} = useInfo();
  const [sItem, setSelected] = useState(0)
  const { mutate } = useSWRConfig()
  const [comment, setComment] = useState("");

  if (isLoading) return  <LoadingIcon />


  const pendingOrderRequests = (order_req: any[]) =>{

    let filtered_req = order_req?.filter((item) => (item?.location?.department_id == data?.user?.department_id && item.order_status == "Pending"))
    return filtered_req
  }



  return (
    <>
  
      {/* <StatsCardsPurchase orders={data.orderRequests} purchases={data.orderRequests.filter((item) => item.order_status == "Approved")} /> */}
      <div className="mt-4">
        <div className="rounded-lg ">
          <h2>Pending order Request</h2>

        {(pendingOrderRequests.length>0)
           ? <PendingRequestTable pageType={"departmentHead"} email={data.user.email} orderRequest={pendingOrderRequests(data?.orderRequests)} />
          : <EmptyState msg={"No Pending Order Request"} />}
        </div>
      </div>
 
    </>
  )
}

