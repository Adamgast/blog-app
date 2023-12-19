import type { UseFormRegister, Path, FieldValues } from 'react-hook-form';
import { Label } from '../../atoms/label/Label';
import cl from './TextAreaBox.module.scss';

type TextAreaBoxProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  errors: string | undefined;
  serverErrors?: string | undefined;
  textLabel: string;
  placeholder?: string;
};

export function TextAreaBox<T extends FieldValues>({
  label,
  register,
  errors,
  serverErrors,
  placeholder,
  textLabel,
}: TextAreaBoxProps<T>) {
  const isError = errors || serverErrors;
  return (
    <div className={cl['textarea-box']}>
      <Label id={label}>{textLabel}</Label>
      <textarea
        id={label}
        placeholder={placeholder}
        {...register(label)}
        className={`${cl['textarea-field']} ${isError ? cl['textarea-error'] : ''}`}
        aria-invalid={isError ? 'true' : 'false'}
      ></textarea>
      {errors && <p role="alert">{errors}</p>}
      {serverErrors && <p role="alert">{`${label} ${serverErrors}`}</p>}
    </div>
  );
}
