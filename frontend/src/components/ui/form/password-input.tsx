import * as React from "react";
import { PasswordInput } from "../password-input";
import { InputControlForm } from "./control";

interface Props extends React.ComponentProps<"input"> {
  label?: string;
}

const InputPasswordForm: React.FC<Props> = ({ label, name, ...props }) => {
  if (typeof name === "undefined") throw new Error("Provide name");

  return (
    <InputControlForm name={name} label={label}>
      <PasswordInput {...props} />
    </InputControlForm>
  );
};

InputPasswordForm.displayName = "PasswordInputForm";

export { InputPasswordForm };
