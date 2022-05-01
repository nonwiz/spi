import { EmptyState } from "@/components/EmptyState";
import { useCustomer, useFinance } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function MyItems() {
  const { data: session } = useSession();
  const { data, isLoading } = useFinance();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  if (isLoading) return <p> Loading ... </p>

  
  return (

      <EmptyState msg={"comming soon"}/>

  )}