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
    console.log("fill in basic detail first ")
    return <UpdateProfile locations={data?.locations} departments={data?.departments} name=" "/>
  }
  return "Redirecting... to ur role"

}
