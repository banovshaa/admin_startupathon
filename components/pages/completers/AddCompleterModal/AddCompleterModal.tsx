import styles from "@/components/pages/dashboard/AddChallengeModal/AddChallengeModal.module.scss";
import Modal from "@/components/shared/Modal/Modal";
import React, { Dispatch, FormEvent, SetStateAction, useRef } from "react";
import Input from "@/components/shared/Input/Input";
import Button from "@/components/shared/Button/Button";
import Textarea from "@/components/shared/Textarea/Textarea";
import { formDataCreate } from "@/libs/form";
import { createCompleterRequest } from "@/services/completers.service";
import { CompleterType } from "@/interfaces/dashboard.interfaces";

const AddCompleterModal = ({
  state,
  setState,
  setData,
}: {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<CompleterType[]>>;
}) => {
  const inputRefs = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    position: useRef<HTMLInputElement>(null),
    linkedInUrl: useRef<HTMLInputElement>(null),
    fundingAmount: useRef<HTMLInputElement>(null),
    projectName: useRef<HTMLInputElement>(null),
    profilePicture: useRef<HTMLInputElement>(null),
    description: useRef<HTMLTextAreaElement>(null),
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        name: "fundingAmount",
        value: inputRefs.fundingAmount.current?.value || "",
      },
      {
        name: "projectName",
        value: inputRefs.projectName.current?.value || "",
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

    const { data, status } = await createCompleterRequest(formData);

    if (status === 201) {
      setState(false);
      setData((prevState) => {
        return [...prevState, data.created];
      });
    }
  };

  return (
    <Modal state={state} setState={setState}>
      <div className={styles.add__challenge}>
        <p className={styles.title}>Add a new completer</p>
        <form onSubmit={handleSubmit}>
          <Input name={"First Name"} required inputRef={inputRefs.firstName} />
          <Input name={"Last Name"} required inputRef={inputRefs.lastName} />
          <Input name={"Position"} required inputRef={inputRefs.position} />
          <Input
            required
            name={"LinkedIn URL"}
            type={"url"}
            inputRef={inputRefs.linkedInUrl}
          />
          <Input name={"Project"} required inputRef={inputRefs.projectName} />
          <Input
            required
            name={"Funding"}
            type="number"
            inputRef={inputRefs.fundingAmount}
          />
          <Input name={"Profile Picture"} inputRef={inputRefs.profilePicture} />
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

export default AddCompleterModal;
