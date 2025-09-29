// datetime.tsx
"use client";

import * as React from "react";
import { Input } from "../input";
import { InputControlForm } from "./control";
import {
  fromDatetimeLocal,
  toDatetimeLocal,
} from "@/components/trains/utils/time";

export interface DateTimeInputProps
  extends Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> {
  label?: string | React.ReactNode;
  description?: string;
  name: string;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  name,
  description,
  ...props
}) => {
  if (typeof name === "undefined") throw new Error("Provide name");

  return (
    <InputControlForm name={name} label={label} description={description}>
      {(field) => (
        <Input
          {...props}
          type="datetime-local"
          value={toDatetimeLocal(field.value || Date.now())}
          onChange={(e) => {
            const unixTime = fromDatetimeLocal(e.target.value);
            field.onChange(unixTime);
          }}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
        />
      )}
    </InputControlForm>
  );
};

DateTimeInput.displayName = "DateTimeInput";

export { DateTimeInput };
