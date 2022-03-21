import Layout from "@/components/layout"
import { useAdmin } from "lib/fetcher";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = useAdmin();

  if (isLoading) return <p> Loading ... </p>
  if (session?.user?.role != "admin") return <p> Unauthorized </p>

   return (
    <Layout>
      <div className="p-4">
</div>
  </Layout>
  )
}
 
