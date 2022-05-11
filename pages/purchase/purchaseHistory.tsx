import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";
import PendingRequestTable from "@/components/purchase/table/PendingRequestTable";
import { usePurchase } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function MyItems() {
  const { data: session } = useSession();
  const { data, isLoading } = usePurchase();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");

  if (isLoading) return  <LoadingIcon />

  // Order requests whose status is not pending 
  const ors = data?.orderRequests.filter(item => item?.order_status == "Purchased")
  

  
  return (
      // <div className="flex justify-center items-center h-96">
      //   {ors?.map((item, index) => 
      //   <li key={index}> {item?.purchase_reason} - {item?.order_status} </li>
      //     )} 
      // </div>

      <div className="">
        <div className=" rounded-lg ">
            <h2>Recent Purchase</h2>
            {(ors?.length>0)?
              <PendingRequestTable orderRequest={ors} email={data?.user.email} pageType={"purchase"} />:
              <EmptyState msg={"No Pending Order Request"} />}
        </div>
      </div>
  )}