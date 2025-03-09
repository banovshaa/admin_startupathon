"use client";

import styles from "./Modal.module.scss";
import { Dispatch, PropsWithChildren, SetStateAction, useEffect } from "react";

type ModalProps = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
} & PropsWithChildren;

const Modal = ({ state, setState, children }: ModalProps) => {
  useEffect(() => {
    if (state) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [state]);

  return (
    <>
      {state && (
        <div className={styles.modal}>
          <div
            onClick={() => setState(false)}
            className={styles.outer__box}
          ></div>
          <div className={styles.inner__box}>{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
