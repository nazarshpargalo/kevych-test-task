import * as React from "react";
import { Input } from "../input";
import { InputControlForm } from "./control";

export interface ControlledInputProps extends React.ComponentProps<"input"> {
  label?: string | React.ReactNode;
  format?: (value: string) => string;
  description?: string;
}

const InputForm: React.FC<ControlledInputProps> = ({
  label,
  name,
  type = "text",
  format,
  description,
  ...props
}) => {
  if (typeof name === "undefined") throw new Error("Provide name");

  return (
    <InputControlForm
      name={name}
      label={label}
      type={type}
      format={format}
      description={description}
    >
      <Input {...{ ...props, name, type }} />
    </InputControlForm>
  );
};

InputForm.displayName = "InputForm";

export { InputForm };
