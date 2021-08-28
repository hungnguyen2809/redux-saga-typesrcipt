import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioGroupOption {
  value: string | number;
  label?: string;
}

interface Props {
  name: string;
  control: Control<any>;
  options: RadioGroupOption[];
  label?: string;
  disabled?: boolean;
}

export function RadioGroupField({ name, control, label, options, disabled }: Props): JSX.Element {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name: name,
    control: control,
  });

  return (
    <FormControl disabled={disabled} component="fieldset" error={invalid}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
      {invalid ? <FormHelperText>{error?.message}</FormHelperText> : null}
    </FormControl>
  );
}
