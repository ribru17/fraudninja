import {
  type OutlinedTextFieldProps,
  type StandardTextFieldProps,
  TextField as TextFieldMui,
} from '@mui/material';
import type { GenericFormikFieldProps } from './interface';
import { useField } from 'formik';

export type TextFieldProps = (StandardTextFieldProps | OutlinedTextFieldProps) &
  GenericFormikFieldProps;

function TextField({ name, helperText, onChange, ...props }: TextFieldProps) {
  const [field, meta] = useField(name);
  const showError = Boolean(meta.error) && meta.touched;
  return (
    <TextFieldMui
      {...props}
      {...field}
      variant='outlined'
      value={field.value ?? ''}
      onChange={(event) => {
        if (onChange) onChange(event);
        field.onChange(event);
      }}
      helperText={showError ? (meta.error ?? '') : helperText}
      error={showError}
    />
  );
}

export default TextField;
