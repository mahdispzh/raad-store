import React from "react";
import { Control, Controller } from "react-hook-form";
import { Select } from "./select";
import { SelectOption } from "./select.types";

interface RHFSelectProps {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  searchable?: boolean;
  required?: boolean;
}

export const RHFSelect: React.FC<RHFSelectProps> = ({
  name,
  control,
  label,
  placeholder,
  options,
  searchable,
  required,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field }) => (
        <Select
          label={label}
          placeholder={placeholder}
          options={options}
          value={field.value}
          onChange={field.onChange}
          searchable={searchable}
          required={required}
        />
      )}
    />
  );
};
