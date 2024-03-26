import OrdersTab from "./OrdersTab";
import OrderItem from "./OrderItem";
import { useContext } from "react";
import { OrdersContext } from "../store/orders-context";
import classes from "./OrdersList.module.css";

export default function OrdersLists() {
  const { orders, activeTab } = useContext(OrdersContext);

  const filteredOrders = orders[activeTab];

  return (
    <div>
      <OrdersTab selectedType={activeTab}>
        <ul className={classes.orderList}>
          {filteredOrders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </ul>
      </OrdersTab>
    </div>
  );
}
