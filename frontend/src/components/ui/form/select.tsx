"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as SelectWrap,
} from "@/components/ui/select";
import * as React from "react";
import { useFormContext } from "react-hook-form";
export interface ISelectOption {
  name?: string | React.ReactNode;
  value: string | null;
}
interface Props {
  label?: string;
  description?: string;
  name: string;
  placeholder?: string;
  options: ISelectOption[];
  disabled?: boolean;
}

export const Select: React.FC<Props> = ({
  label,
  name,
  placeholder,
  options,
  description,
  disabled = false,
}: Props) => {
  const { control } = useFormContext();

  if (typeof name === "undefined") throw new Error("Provide name");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <SelectWrap onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger disabled={disabled}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(({ value, name }, index) => (
                <SelectItem key={`${index}-${value}`} value={value as string}>
                  {name || value}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectWrap>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
