import Label from "../Layout/Label";
import DeliveryInfo from "./DeliveryInfo";
import SubscriptionInfo from "./SubscriptionInfo";
import styled from "styled-components";
import PaymentInfo from "./PaymentInfo";
import Divider from "../Layout/Divider";
import { useContext, useEffect } from "react";
import { subsCtx } from "../store/SubscribeContext";
import { useSession } from "next-auth/react";
import Router from "next/router";

const Order = () => {
  const { subsInfo, totalPrice, subsDays, totalQuantity } = useContext(subsCtx);

  const { status } = useSession();
  if (status !== "authenticated") {
    Router.replace("/auth/login");
  }

  useEffect(() => {
    sessionStorage.setItem("subsInfo", JSON.stringify(subsInfo));
    sessionStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    sessionStorage.setItem("subsDays", JSON.stringify(subsDays));
    sessionStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
  }, [subsInfo, totalPrice, subsDays, totalQuantity]);

  return (
    <SubsCribeWrap>
      <Label label="구독 결제" />
      <DeliveryInfo />
      <Divider />
      <SubscriptionInfo totalQuantity={totalQuantity} />
      <Divider />
      <PaymentInfo totalPrice={totalPrice} />
    </SubsCribeWrap>
  );
};

export default Order;

const SubsCribeWrap = styled.div`
  padding: 20px;
  max-width: 768px;
  width: 100%;
  justify-content: center;
  margin-bottom: 100px;
`;
