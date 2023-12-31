import { useState } from 'react';
import type { UseFormRegister, Path, FieldValues } from 'react-hook-form';
import { Label } from '../../atoms/label/Label';
import { ReactComponent as ClearIcon } from '../../../assets/svg/close.svg';
import { ReactComponent as OpenIcon } from '../../../assets/svg/eye-open.svg';
import { ReactComponent as CloseIcon } from '../../../assets/svg/eye-close.svg';
import cl from './InputBox.module.scss';

type InputBoxProps<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  errors: string | undefined;
  serverErrors?: string | undefined;
  textLabel: string;
  type: 'text' | 'password';
  placeholder?: string;
  clearField?: () => void;
};

export function InputBox<T extends FieldValues>({
  label,
  register,
  errors,
  serverErrors,
  type,
  placeholder,
  textLabel,
  clearField,
}: InputBoxProps<T>) {
  const [open, setOpen] = useState(false);
  const isError = errors || serverErrors;
  const isClearIcon = type === 'text' && !label.includes('password');
  const isEyeIcon = (type === 'text' || type === 'password') && label.toLowerCase().includes('password');

  const showClosePassword = (isOpen: boolean) => {
    if (isOpen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className={cl['input-box']}>
      <Label id={label}>{textLabel}</Label>
      <div className={cl['input-container']}>
        <input
          type={type === 'password' ? (open ? 'text' : 'password') : type}
          id={label}
          placeholder={placeholder}
          {...register(label)}
          className={`${cl['input-field']} ${isError ? cl['input-error'] : ''}`}
          aria-invalid={isError ? 'true' : 'false'}
        />
        {isClearIcon && (
          <button type="button" onClick={clearField}>
            <ClearIcon className={cl['clear-icon']} />
          </button>
        )}
        {isEyeIcon && (
          <button type="button" onClick={() => showClosePassword(open)}>
            {open ? <OpenIcon className={cl['eye-icon']} /> : <CloseIcon className={cl['eye-icon']} />}
          </button>
        )}
      </div>
      {errors && <p role="alert">{errors}</p>}
      {serverErrors && <p role="alert">{`${label} ${serverErrors}`}</p>}
    </div>
  );
}
