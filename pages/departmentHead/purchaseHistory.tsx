import { useCustomer } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function MyItems() {
  const { data: session } = useSession();
  const { data, isLoading } = useCustomer();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");
  if (isLoading) return <p> Loading ... </p>

  
  return (
      <div className="flex justify-center items-center h-96">comming soon....</div>
  )}