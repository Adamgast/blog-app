import type { UseFormRegister, Path, FieldValues } from 'react-hook-form';
import { Label } from '../../atoms/label/Label';
import cl from './InputBox.module.scss';

type InputBoxProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  errors: string | undefined;
  serverErrors?: string | undefined;
  textLabel: string;
  type: 'text' | 'password';
  placeholder?: string;
};

export function InputBox<T extends FieldValues>({
  label,
  register,
  errors,
  serverErrors,
  type,
  placeholder,
  textLabel,
}: InputBoxProps<T>) {
  const isError = errors || serverErrors;
  return (
    <div className={cl['input-box']}>
      <Label id={label}>{textLabel}</Label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        {...register(label)}
        className={`${cl['input-field']} ${isError ? cl['input-error'] : ''}`}
        aria-invalid={isError ? 'true' : 'false'}
      />
      {errors && <p role="alert">{errors}</p>}
      {serverErrors && <p role="alert">{`${label} ${serverErrors}`}</p>}
    </div>
  );
}
