// components/ui/form/InputControlForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";

interface Props {
  label?: string | React.ReactNode;
  name: string;
  children:
    | React.ReactElement
    | ((field: ControllerRenderProps<any, any>) => React.ReactNode);
  description?: string;
  format?: (value: string) => string;
  type?: string;
}

const InputControlForm: React.FC<Props> = ({
  label,
  name,
  description,
  format,
  children,
}) => {
  const { control, setValue } = useFormContext();

  if (!name) throw new Error("Provide name");

  const makeBlurHandler = (field: ControllerRenderProps<any, any>) => {
    return (e: React.FocusEvent<HTMLElement>) => {
      field.onBlur();
      const raw = (e.target as HTMLInputElement).value ?? field.value;
      const cleaned = format ? format(raw) : raw;
      setValue(field.name, cleaned, {
        shouldValidate: true,
        shouldDirty: true,
      });
    };
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {typeof children === "function"
              ? children(field)
              : React.cloneElement(children, {
                  ...(children.props || {}),
                  ...field,
                  ...(format && { onBlur: makeBlurHandler(field) }),
                })}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

InputControlForm.displayName = "InputControlForm";
export { InputControlForm };
