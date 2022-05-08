import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";
import { useCustomer, useFinance } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function PurchaseHistory() {
  const { data: session } = useSession();
  const { data, isLoading } = useFinance();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  if (isLoading) return  <LoadingIcon />

  
  return (

      <EmptyState msg={"comming soon"}/>

  )}