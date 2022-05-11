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


  if (isLoading || infoLoading) return  <LoadingIcon />

  if (!data?.user?.name || !data?.user?.department || !data?.user?.location) {
    return <UpdateProfile locations={info?.locations} departments={info?.departments} />
  }

  if(data.user.role == "finance_officer"){router.push('/finance')}
  if(data.user.role == "department_head"){router.push('/departmentHead')}
  if(data.user.role == "purchasing_officer"){router.push('/purchase')}
  if(data.user.role == "inventory"){router.push('/inventory')}

  
  router.push('/customer')
  return null
}
