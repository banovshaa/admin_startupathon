import { CSSProperties } from "react";
import styles from "./DefaultHeader.module.scss";
import { AddIcon } from "@/assets/images/shared.vector";
import Button from "../Button/Button";

type ButtonProps = {
  name: string;
  onClick(): void;
  style?: CSSProperties;
};

type DefaultHeaderOption = {
  title: string;
  buttons?: Array<ButtonProps>;
};

const DefaultHeader = ({ options }: { options: DefaultHeaderOption }) => {
  return (
    <div className={styles.default__header}>
      <div className={styles.left}>
        <p className={styles.title}>{options.title}</p>
      </div>
      <div className={styles.right}>
        <div className={styles.buttons}>
          {options.buttons &&
            options.buttons.map((button, index) => {
              return (
                <Button
                  key={"button_" + index}
                  icon={AddIcon}
                  name={button.name}
                  onClick={button.onClick}
                  style={button.style}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DefaultHeader;
