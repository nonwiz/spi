import Layout from "../components/layout"
import { useCustomer, useInfo } from "lib/fetcher";

import LoadingIcon from "@/components/loadingIcon";
import FormUpdateProfile from "@/components/customer/updateProfile";
import UpdateProfile from "@/components/UpdateProfile";
import { useRouter } from "next/router";


export default function IndexPage() {
  const { data, isLoading } = useCustomer();
  const { data: info, isLoading: infoLoading } = useInfo();
  const router = useRouter()

  console.log(data, info)
  if (isLoading || infoLoading) return  <LoadingIcon />

  if (!data?.user?.name || !data?.user?.department || !data?.user?.location) {
    return <UpdateProfile locations={info?.locations} departments={info?.departments} />
  }
  
  router.push('/customer')
  return null
}
