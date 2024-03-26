// OrdersTab.js

import { useContext } from "react";
import { OrdersContext } from "../store/orders-context";
import classes from "./OrdersTab.module.css";

import Tab from "./Tab";
export default function OrdersTab({ children }) {
  const { activeTab, changeTab } = useContext(OrdersContext);

  return (
    <>
      <menu className={classes.menuContainer}>
        <Tab
          isSelected={activeTab === "pending"}
          onSelect={() => changeTab("pending")}
        >
          Pending
        </Tab>
        <Tab
          isSelected={activeTab === "completed"}
          onSelect={() => changeTab("completed")}
        >
          Completed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}
