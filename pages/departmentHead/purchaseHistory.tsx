import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";
import PendingRequestTable from "@/components/purchase/table/PendingRequestTable";
import { useCustomer, useDepartmentHead, useInfo } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function MyItems() {
  const { data: session } = useSession();
  const { data, isLoading } = useDepartmentHead();
  const { data: info, isLoading: infoLoading } = useInfo();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");


  
  
  const createOrder = () =>{
    setVisible(true);
  }

  const closeHandler = () => {
    setVisible(false);
  };
  if (isLoading) return  <LoadingIcon />

  
  const pendingRequests = (order_req: any[]) =>{
    let filtered_req = order_req.filter((item) => (item?.location?.department_id == data?.user?.department_id) && item?.order_status=="Purchased")
    return filtered_req
  }

  return (
    
    
      <div className="">
        <div className=" rounded-lg ">
            <h2>Purchase History</h2>
            {console.log(data)}
            {(pendingRequests(data?.orderRequests).length>0)?
               <PendingRequestTable pageType={"departmentHead"} email={data?.user?.email} orderRequest={pendingRequests(data?.orderRequests)} />:
               <EmptyState msg={"You did not make any purchase"} />}
        </div>
      </div>

  )
}