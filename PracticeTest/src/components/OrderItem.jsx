import classes from "./OrderItem.module.css";
import { useContext } from "react";
import { OrdersContext } from "../store/orders-context";
import { MdDateRange } from "react-icons/md";
export default function OrderItem({ order }) {
  const { isOrderCancelable, cancelOrder } = useContext(OrdersContext);
  const date = new Date(order.createdAt);
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString();

  return (
    <div className={classes.container}>
      <h2 className={classes.id}>{order.id}</h2>
      <li className={classes.listItem}>
        <div className={classes.date}>
          <p>
            <MdDateRange />
            {dateString}
          </p>
          <p>{timeString}</p>
        </div>
        <ul className={classes.itemContainer}>
          {order.orderItems.map((item) => (
            <li key={item.id} className={classes.innerListItem}>
              <p>
                {item.quantity}
                {"x"} {item.orderMenuItem.translations.en.name}
              </p>
              <p>
                {item.finalPrice.amount} {item.finalPrice.currency}
              </p>
            </li>
          ))}
        </ul>
        <p className={classes.price}>
          Total Price: {order.totalPrice.amount} {order.totalPrice.currency}
        </p>
        <div className={classes.stateContainer}>
          <p className={classes.state}>{order.state}</p>
          {isOrderCancelable(order) && (
            <button
              onClick={() => cancelOrder(order.id)}
              className={classes.button}
            >
              Cancel
            </button>
          )}
        </div>
      </li>
    </div>
  );
}
