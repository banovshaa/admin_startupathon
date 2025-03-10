import styles from "@/components/pages/dashboard/AddChallengeModal/AddChallengeModal.module.scss";
import Modal from "@/components/shared/Modal/Modal";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useRef,
} from "react";
import Input from "@/components/shared/Input/Input";
import Button from "@/components/shared/Button/Button";
import Textarea from "@/components/shared/Textarea/Textarea";
import { FounderType } from "@/interfaces/dashboard.interfaces";
import { formDataCreate } from "@/libs/form";
import { createFounderRequest } from "@/services/founders.service";
import { LoaderContext } from "@/components/providers/LoaderProvider";

const AddFounderModal = ({
  state,
  setState,
  setData,
}: {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<FounderType[]>>;
}) => {
  const { setLoading } = useContext(LoaderContext);

  const inputRefs = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    position: useRef<HTMLInputElement>(null),
    linkedInUrl: useRef<HTMLInputElement>(null),
    profilePicture: useRef<HTMLInputElement>(null),
    description: useRef<HTMLTextAreaElement>(null),
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = formDataCreate([
      {
        name: "firstName",
        value: inputRefs.firstName.current?.value || "",
      },
      {
        name: "lastName",
        value: inputRefs.lastName.current?.value || "",
      },
      {
        name: "position",
        value: inputRefs.position.current?.value || "",
      },
      {
        name: "linkedInUrl",
        value: inputRefs.linkedInUrl.current?.value || "",
      },
      {
        name: "profilePicture",
        value: inputRefs.profilePicture.current?.value || "",
      },
      {
        name: "description",
        value: inputRefs.description.current?.value || "",
      },
    ]);

    const { data, status } = await createFounderRequest(formData);

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
        <p className={styles.title}>Add a new founder</p>
        <form onSubmit={handleSubmit}>
          <Input name={"First Name"} required inputRef={inputRefs.firstName} />
          <Input name={"Last Name"} required inputRef={inputRefs.lastName} />
          <Input name={"Position"} required inputRef={inputRefs.position} />
          <Input
            name={"LinkedIn URL"}
            type={"url"}
            required
            inputRef={inputRefs.linkedInUrl}
          />
          <Input
            name={"Profile Picture"}
            type="url"
            required
            inputRef={inputRefs.profilePicture}
          />
          <Textarea
            name={"Description"}
            required
            textareaRef={inputRefs.description}
          />
          <Button name="Submit" />
        </form>
      </div>
    </Modal>
  );
};

export default AddFounderModal;
