import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { ButtonFull } from '../../../../ui/atoms/button-full/ButtonFull';
import { ContainerForm } from '../../../../ui/atoms/container-form/ContainerForm';
import { TitleForm } from '../../../../ui/atoms/title-form/TitleForm';
import { Label } from '../../../../ui/atoms/label/Label';
import { IRegist } from '../../models/IRegist';
import { clearServerErrors, registrationUser } from '../../store/userSlice';
import cl from './RegistrationForm.module.scss';

export const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading, serverErrors } = useAppSelector((state) => state.user);

  useEffect(() => {
    return () => {
      if (serverErrors) dispatch(clearServerErrors());
    };
  }, [serverErrors, dispatch]);

  const schema = yup.object().shape({
    username: yup.string().min(3).max(20).required(),
    email: yup.string().lowercase().strict().email().required(),
    password: yup.string().min(6).max(40).required(),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'password should match!')
      .required('repeat password is required'),
    checkbox: yup.boolean().oneOf([true]),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: IRegist) => {
    dispatch(clearServerErrors());
    dispatch(registrationUser(data));
  };

  return (
    <ContainerForm onSubmit={handleSubmit(onSubmit)}>
      <TitleForm>Create new account</TitleForm>

      <div className={cl['form-fields']}>
        <div className={cl['input-box']}>
          <Label id="userName">Username</Label>
          <input
            type="text"
            id="userName"
            placeholder="Username"
            {...register('username')}
            className={`${cl['input-field']} ${(errors.username || serverErrors?.username) && cl['input-error']}`}
          />
          <p>{errors.username?.message}</p>
          <p>{serverErrors?.username && `username ${serverErrors?.username}`}</p>
        </div>
        <div className={cl['input-box']}>
          <Label id="email">Email address</Label>
          <input
            type="text"
            id="email"
            placeholder="Email address"
            {...register('email')}
            className={`${cl['input-field']} ${(errors.email || serverErrors?.email) && cl['input-error']}`}
          />
          <p>{errors.email?.message}</p>
          <p>{serverErrors?.email && `email ${serverErrors?.email}`}</p>
        </div>
        <div className={cl['input-box']}>
          <Label id="password">Password</Label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register('password')}
            className={`${cl['input-field']} ${errors.password && cl['input-error']}`}
          />
          <p>{errors.password?.message}</p>
        </div>
        <div className={cl['input-box']}>
          <Label id="repeatPassword">Repeat Password</Label>
          <input
            type="password"
            id="repeatPassword"
            placeholder="Password"
            {...register('repeatPassword')}
            className={`${cl['input-field']} ${errors.repeatPassword && cl['input-error']}`}
          />
          <p>{errors.repeatPassword?.message}</p>
        </div>
      </div>

      <label htmlFor="checkbox" className={cl['checkbox-label']}>
        <input type="checkbox" id="checkbox" {...register('checkbox')} className={cl['checkbox-input']} />
        <span className={`${cl['checkbox-text']} ${errors.checkbox && cl['checkbox-error']}`}>
          I agree to the processing of my personal information
        </span>
      </label>

      <ButtonFull disabled={isLoading} type="submit">
        Create
      </ButtonFull>

      <div className={cl['form-bottom']}>
        Already have an account?{' '}
        <Link className={cl['form-link']} to="/sign-in">
          Sign In.
        </Link>
      </div>
    </ContainerForm>
  );
};
