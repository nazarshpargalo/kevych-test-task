import * as React from "react";
import { Input } from "../input";
import { InputControlForm } from "./control";
import { ControlledInputProps } from "./input";

const NumberInput = ({ label, name, format, description, ...props }: ControlledInputProps) => {
  const type = "number";
  if (typeof name === "undefined") throw new Error("Provide name");

  return (
    <InputControlForm
      name={name}
      label={label}
      type={type}
      format={format}
      description={description}
    >
      {(field) => (
        <Input
          {...props}
          type={type}
          value={field.value === undefined || field.value === null ? "" : String(field.value)}
          onChange={(e) => {
            const numericValue = e.target.valueAsNumber;
            field.onChange(numericValue || 0);
          }}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
          onWheel={(e) => {
            e.currentTarget.blur();
          }}
        />
      )}
    </InputControlForm>
  );
};

NumberInput.displayName = "NumberInput";
export { NumberInput };
