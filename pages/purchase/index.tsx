import StatsCardsPurchase from "@/components/purchase/StatsCardsPurchase";
import PendingRequestTable from "@/components/purchase/table/PendingRequestTable";
import { usePurchase, useInfo  } from "lib/fetcher";
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
  const { data: info, isLoading:infoLoading } = useInfo();
  const [sItem, setSelected] = useState(0)
  const { mutate } = useSWRConfig()
  if (isLoading || infoLoading) return  <LoadingIcon />

 // pendingOrderRequests 
  const por = data.orderRequests.filter(oreq => oreq.order_status == "Pending" && oreq.approval_by.length > 1)

  return (
    <>

      {/* <div className="bg-rose-500">
        <h2 > PDF </h2>
        <PDFViewer>
          <PdfDocument props={{ name: "Hesoyamyam", logo: "/assets/aiu_shield.png", order_request: ors[sItem] }} />
        </PDFViewer>
      </div> */}
      <StatsCardsPurchase orders={por} purchases={data.orderRequests.filter((item) => item.order_status == "Purchased")} />
      <div className="mt-4">
        <div className="rounded-lg ">
          <h2>Pending order Request</h2>

          {(por.length > 0)
            ?<PendingRequestTable email={data.user.email} pageType={"purchase"} orderRequest={por} />
            :<EmptyState msg={"No Pending Order Request"} />}
        </div>
      </div>

      
    </>
  )
}

