import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";
import { useCustomer } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function MovingRequest() {
  const { data: session } = useSession();
  const { data, isLoading } = useCustomer();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  if (isLoading) return  <LoadingIcon />

  
  return (
    <EmptyState msg={"Coming soon"}/>
  )}