import { TextField } from '@material-ui/core';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export function InputField({ name, control, label, ...inputProps }: Props): JSX.Element {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name: name,
    control: control,
  });

  // dưới đây là UI thì tùy vào UI thì nó sẽ xử dụng khác nhau
  return (
    <TextField
      size={'small'}
      fullWidth
      margin={'normal'}
      variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      innerRef={ref}
      inputProps={inputProps} // được dùng để bind các prop từ input từ prop cha vào, vì prop này là của input nên dùng inputProps
      error={invalid} //invalid xác định xem field nó validate có đúng hay không
      helperText={error?.message} //error?.message hiển thị message lỗi khi validate
    />
  );
}
