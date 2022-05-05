import Layout from "../components/layout"
import { useCustomer, useInfo } from "lib/fetcher";
import FormUpdateProfile from "@/components/customer/updateProfile";
import { useRouter } from "next/router";


export default function IndexPage() {
  const { data, isLoading } = useCustomer();
  const { data: info, isLoading: infoLoading } = useInfo();

  const router = useRouter();

  if (isLoading) return "....";

  if (!data.user?.name || !data.user?.department || !data.user?.location) {
    console.log("fill in basic detail first ")
    return <FormUpdateProfile locations={info?.locations} departments={info?.departments} name=" "/>
  }
  return "Redirecting... to ur role"

}
