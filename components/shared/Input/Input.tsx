"use client";

import styles from "./Input.module.scss";
import { InputHTMLAttributes, RefObject } from "react";

interface Input extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
}

const Input = ({ name, inputRef, ...props }: Input) => {
  return (
    <div className={styles.input__box}>
      {name && <p className={styles.input__box__title}>{name}</p>}
      <input ref={inputRef} {...props} />
    </div>
  );
};

export default Input;
