import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";
import { useInventory } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DepreciatedAssets() {
  const { data: session } = useSession();
  const { data, isLoading } = useInventory();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  if (isLoading) return  <LoadingIcon />

  
  return (
      <EmptyState msg={"comming soon"}/>

  )}