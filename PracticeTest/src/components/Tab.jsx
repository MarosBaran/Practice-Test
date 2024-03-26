import classes from "./Tab.module.css";

export default function Tab({ isSelected, onSelect, children }) {
  const buttonClass = isSelected ? classes.selected : "";
  return (
    <li className={classes.tab}>
      <button className={`${classes.button} ${buttonClass}`} onClick={onSelect}>
        {children}
      </button>
    </li>
  );
}
