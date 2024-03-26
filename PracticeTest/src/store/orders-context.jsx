import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const OrdersContext = createContext({
  orders: {
    pending: [],
    completed: [],
  },
  activeTab: "pending",
  changeTab: () => {},
  cancelOrderLocally: () => {},
  isOrderCancelable: () => {},
});
export default function OrdersContextProvider({ children }) {
  const [orders, setOrders] = useState({
    pending: [],
    completed: [],
  });
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pendingRes, completedRes] = await axios.all([
        axios.get(
          "https://api.sunrero.space/order_menu_orders/my_orders?state[]=new&state[]=waiting_for_confirmation&state[]=confirmed",
          {
            headers: {
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDk3OTg4OTUsImV4cCI6MTc0MTM1NTg0Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoicmFkb3NsYXZAZWxpdHkuZGV2In0.YISa1YJkjHBbI7jXOOhIK6oVZT12jOaKuPdbG5MBsS3G7Ovi4bhcPNMhcEXjl13EjPk56EJgIjwuEpL-WvUYNdXO8eEZa4vPCKRhDnzYMnL1Jp5UL3F0nVgek0GtQEPfYDVc8vGY_xlKb681eRzJzsTq06z5x44s1POlGAvbJQcGS9FrGAMCaaMHhU4bX0I88W7zx7s2lJQnNQvcaCOL4cTi9hv5oeLlIYcZZGyXxCa6RYEuIPw1X1Mc2PvG84CBQUJSVGJEexeyrbrMK8e3XNo4hbPPL4s2nFp6j8hrwURH12gusLLVKX8J5SbWjsgdBV2wg2kZklvuTDsOZP7yow",
            },
          }
        ),
        axios.get(
          "https://api.sunrero.space/order_menu_orders/my_orders?state[]=completed&state[]=canceled_by_customer&state[]=rejected&state[]=expired&state[]=failed",
          {
            headers: {
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDk3OTg4OTUsImV4cCI6MTc0MTM1NTg0Nywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoicmFkb3NsYXZAZWxpdHkuZGV2In0.YISa1YJkjHBbI7jXOOhIK6oVZT12jOaKuPdbG5MBsS3G7Ovi4bhcPNMhcEXjl13EjPk56EJgIjwuEpL-WvUYNdXO8eEZa4vPCKRhDnzYMnL1Jp5UL3F0nVgek0GtQEPfYDVc8vGY_xlKb681eRzJzsTq06z5x44s1POlGAvbJQcGS9FrGAMCaaMHhU4bX0I88W7zx7s2lJQnNQvcaCOL4cTi9hv5oeLlIYcZZGyXxCa6RYEuIPw1X1Mc2PvG84CBQUJSVGJEexeyrbrMK8e3XNo4hbPPL4s2nFp6j8hrwURH12gusLLVKX8J5SbWjsgdBV2wg2kZklvuTDsOZP7yow",
            },
          }
        ),
      ]);
      setOrders({
        pending: pendingRes.data["hydra:member"],
        completed: completedRes.data["hydra:member"],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  const cancelOrder = (orderId) => {
    const orderToCancel = orders.pending.find((order) => order.id === orderId);
    if (orderToCancel) {
      const updatedPendingOrders = orders.pending.filter(
        (order) => order.id !== orderId
      );

      const updatedCompletedOrders = [
        ...orders.completed,
        { ...orderToCancel, state: "canceled_by_customer" },
      ];

      setOrders({
        pending: updatedPendingOrders,
        completed: updatedCompletedOrders,
      });
    }
  };
  const isOrderCancelable = (order) => {
    return order.state === "new" || order.state === "waiting_for_confirmation";
  };

  const ordersContext = {
    orders,
    activeTab,
    changeTab,
    cancelOrder,
    isOrderCancelable,
  };

  return (
    <OrdersContext.Provider value={ordersContext}>
      {children}
    </OrdersContext.Provider>
  );
}
