import { RefObject, TextareaHTMLAttributes } from "react";
import styles from "./Textarea.module.scss";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  textareaRef?: RefObject<HTMLTextAreaElement | null>;
}

const Textarea = ({ name, textareaRef, ...props }: TextAreaProps) => {
  return (
    <label className={styles.textarea}>
      <span>{name ? name : "Comment"}</span>
      <textarea ref={textareaRef} {...props} />
    </label>
  );
};

export default Textarea;
