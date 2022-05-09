import CreateOrderReq from "@/components/customer/createOrderReqModal";
import FormCreateOrderRequest from "@/components/customer/createOrderRequest";
import OrderRequestTable from "@/components/customer/tables/OrderRequestTable";
import { EmptyState } from "@/components/EmptyState";
import LoadingIcon from "@/components/loadingIcon";

import { useCustomer, useInfo } from "lib/fetcher";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const { data, isLoading } = useCustomer();
  const { data:info, isLoading:infoLoading } = useInfo();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("none");

  if (isLoading || infoLoading) return  <LoadingIcon />

  const createOrder = () =>{
    setVisible(true);
  }
  const closeHandler = () => {
    setVisible(false);
  };

  return (
      <>
      <h1> Test </h1>
      <FormCreateOrderRequest />
     
      </>
  ) }

