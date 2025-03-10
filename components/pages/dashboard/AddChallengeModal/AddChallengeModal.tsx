import Modal from "@/components/shared/Modal/Modal";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import styles from "./AddChallengeModal.module.scss";
import Input from "@/components/shared/Input/Input";
import Button from "@/components/shared/Button/Button";
import Textarea from "@/components/shared/Textarea/Textarea";
import Checkbox from "@/components/shared/Checkbox/Checkbox";
import { formDataCreate } from "@/libs/form";
import { createChallengeRequest } from "@/services/challenges.service";
import { ChallengeType } from "@/interfaces/dashboard.interfaces";
import { LoaderContext } from "@/components/providers/LoaderProvider";

const AddChallengeModal = ({
  state,
  setState,
  setData,
}: {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<ChallengeType[]>>;
}) => {
  const inputRefs = {
    title: useRef<HTMLInputElement>(null),
    fundingAmount: useRef<HTMLInputElement>(null),
    deadline: useRef<HTMLInputElement>(null),
    image: useRef<HTMLInputElement>(null),
    description: useRef<HTMLTextAreaElement>(null),
  };
  const { setLoading } = useContext(LoaderContext);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = formDataCreate([
      {
        name: "title",
        value: inputRefs.title.current?.value || "",
      },
      {
        name: "deadline",
        value: inputRefs.deadline.current?.value || "",
      },
      {
        name: "isVisible",
        value: isVisible ? "true" : "false",
      },
      {
        name: "image",
        value: inputRefs.image.current?.value || "",
      },

      {
        name: "fundingAmount",
        value: inputRefs.fundingAmount.current?.value || "",
      },

      {
        name: "description",
        value: inputRefs.description.current?.value || "",
      },
    ]);

    const { data, status } = await createChallengeRequest(formData);

    if (status === 201) {
      setState(false);
      setData((prevState) => {
        return [...prevState, data.created];
      });
    }
    setLoading(false);
  };
  return (
    <Modal state={state} setState={setState}>
      <div className={styles.add__challenge}>
        <p className={styles.title}>Add a new challenge</p>
        <form onSubmit={handleSubmit}>
          <Input name={"Title"} required inputRef={inputRefs.title} />
          <Input
            name={"Funding"}
            type="number"
            required
            inputRef={inputRefs.fundingAmount}
          />
          <Input
            name={"Deadline"}
            type={"date"}
            required
            inputRef={inputRefs.deadline}
          />
          <Input
            name={"Image"}
            type="url"
            required
            inputRef={inputRefs.image}
          />
          <Checkbox
            name={"Visibility"}
            id={"visibility"}
            checked={isVisible}
            onChange={() => {
              setIsVisible(!isVisible);
            }}
          />
          <Textarea
            name={"Description"}
            required
            textareaRef={inputRefs.description}
          />
          <Button name={"Submit"} />
        </form>
      </div>
    </Modal>
  );
};

export default AddChallengeModal;
