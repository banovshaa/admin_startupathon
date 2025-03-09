import { ButtonHTMLAttributes, ComponentType, CSSProperties } from "react";
import styles from "./Button.module.scss";

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  style?: CSSProperties;
  icon?: ComponentType;
}

const Button = ({ name, style, icon, ...props }: Button) => {
  const Icon = icon;

  return (
    <button className={styles.button} style={style} {...props}>
      {Icon && <Icon />}
      <span>{name}</span>
    </button>
  );
};

export default Button;
