import { userManagerService } from "@/services/userManager.services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Invoice from "./Invoice";
import { useStore } from "@/stores";
import { observer } from "mobx-react-lite";

const OrderDetailPage = () => {
  const params = useParams();
  const orderId = params.id;

  const [invoiceInfo,setInvoiceInfo]=useState()

  useEffect(() => {
    userManagerService.getOrderDetail(orderId).then((data) => {
      setInvoiceInfo(data)
    });
  },[]);
   if(!invoiceInfo){
     return <></>
   }
  return <Invoice invoice={invoiceInfo} />;
};

export default observer(OrderDetailPage);
