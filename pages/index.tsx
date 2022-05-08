import Layout from "../components/layout"
import { useCustomer, useInfo } from "lib/fetcher";

import LoadingIcon from "@/components/loadingIcon";
import FormUpdateProfile from "@/components/customer/updateProfile";
import UpdateProfile from "@/components/UpdateProfile";


export default function IndexPage() {
  const { data, isLoading } = useCustomer();
  const { data: info, isLoading: infoLoading } = useInfo();


  console.log(info)
  if (isLoading) return  <LoadingIcon />

  if (!data.user?.name || !data.user?.department || !data.user?.location) {
    return <UpdateProfile locations={info?.locations} departments={info?.departments}/>
  }
  return "Redirecting... to ur role"

}
