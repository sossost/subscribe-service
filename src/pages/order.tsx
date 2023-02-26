import Order from "../components/order/Order";
import dynamic from "next/dynamic";

const DynamicOrder = dynamic(() => import("../components/order/Order"), {
  ssr: false,
});

const OrderPage = () => {
  return <DynamicOrder />;
};

export default OrderPage;
