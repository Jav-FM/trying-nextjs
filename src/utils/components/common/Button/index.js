import Link from "next/link";
import classes from "./Button.module.css";

const Button = ({ children, href, onClick }) => {
  if (href) {
    return (
      <Link className={classes.btn} href={href}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={classes.btn} onClick={onClick && onClick}>
        {children}
      </button>
    );
  }
};

export default Button;
