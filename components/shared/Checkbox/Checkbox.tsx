import styles from "./Checkbox.module.scss";
import { InputHTMLAttributes, Ref } from "react";

const Checkbox = ({
  id,
  name,
  inputRef,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string | number;
  name?: string;
  inputRef?: Ref<HTMLInputElement>;
}) => {
  return (
    <div className={`${styles.checkbox__wrapper}`}>
      {name && <p className={styles.title}> {name} </p>}
      <input
        className={`${styles.tgl} ${styles.tgl__light}`}
        id={id}
        ref={inputRef}
        type="checkbox"
        {...props}
      />
      <label className={styles.tgl__btn} htmlFor={id} />
    </div>
  );
};

export default Checkbox;
