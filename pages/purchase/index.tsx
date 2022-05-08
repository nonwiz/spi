import StatsCardsPurchase from "@/components/purchase/StatsCardsPurchase";
import PendingRequestTable from "@/components/purchase/table/PendingRequestTable";
import { usePurchase } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { fetcher } from "lib/fetcher"
import { useSWRConfig } from "swr"
import { PDFViewer } from '@react-pdf/renderer';
import PdfDocument from "@/components/purchase/pdfDocument";
import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";

export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = usePurchase();
  const [sItem, setSelected] = useState(0)
  const { mutate } = useSWRConfig()
  if (isLoading) return  <LoadingIcon />
  
  const { orderRequests: ors } = data;
  return (
    <>
    {/* <div className="w-full h-96 flex justify-center items-center"><LoadingIcon /></div> */}

                       
             

      <div className="bg-rose-500">
        <h2 > PDF </h2>
        <PDFViewer>
          <PdfDocument props={{ name: "Hesoyamyam", logo: "/assets/aiu_shield.png", order_request: ors[sItem] }} />
        </PDFViewer>
      </div>
      <StatsCardsPurchase orders={data.orderRequests} purchases={data.orderRequests.filter((item) => item.order_status == "Approved")} />
      <div className="mt-4">
        <div className="rounded-lg ">
          <h2>Pending order Request</h2>

          {(data.orderRequests)
            ?<PendingRequestTable email={data.user.email} pageType={"purchase"} orderRequest={data.orderRequests.filter((item) => item.order_status == "Pending")} />
            :<EmptyState msg={"No Pending Order Request"} />}
        </div>
      </div>

      
    </>
  )
}

