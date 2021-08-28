import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  value: string | number;
  label: string;
}

interface Props {
  name: string;
  control: Control<any>;
  options: SelectOption[];
  label?: string;
  disabled?: boolean;
}

export function SelectField({ name, control, label, options, disabled }: Props): JSX.Element {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name: name,
    control: control,
  });

  return (
    <FormControl
      fullWidth
      margin={'normal'}
      variant="outlined"
      size={'small'}
      disabled={disabled}
      error={invalid}
    >
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {invalid ? <FormHelperText>{error?.message}</FormHelperText> : null}
    </FormControl>
  );
}
