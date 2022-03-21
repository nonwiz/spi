import FormCreateOrderRequest from "@/components/customer/createOrderRequest";
import Layout from "@/components/layout"
import { useAdmin } from "lib/fetcher";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = useAdmin();

  if (isLoading) return <p> Loading ... </p>

  return (
    <Layout>
      <div className="p-4">
        <FormCreateOrderRequest />
      </div>
    </Layout>
  )
}

