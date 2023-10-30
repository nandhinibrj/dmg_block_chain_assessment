import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

type FieldProps<T> = {
  value?: T;
  onChange: (newValue: T) => void;
  helperText?: React.ReactNode;
};

const FIELD_PROPS = {
  size: "small",
  variant: "standard",
  InputLabelProps: { shrink: true },
} as const;

const CustomField = <T extends string>({
  value,
  onChange,
  ...props
}: Omit<TextFieldProps, "onChange"> & FieldProps<T>) => (
  <TextField
    {...FIELD_PROPS}
    inputProps={{ sx: { textOverflow: "ellipsis" } }}
    value={value ?? ""}
    required
    onChange={(event) => onChange(event.target.value as T)}
    {...props}
  />
);

export default React.memo(CustomField);
