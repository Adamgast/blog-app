import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { clearServerErrors, loginUser } from '../../store/userSlice';
import { Error } from '../../../../ui/molecules/error/Error';
import { InputBox } from '../../../../ui/molecules/input-box/InputBox';
import { ButtonFull } from '../../../../ui/atoms/button-full/ButtonFull';
import { ContainerForm } from '../../../../ui/atoms/container-form/ContainerForm';
import { TitleForm } from '../../../../ui/atoms/title-form/TitleForm';
import { ILogin } from '../../models/ILogin';
import cl from './LoginForm.module.scss';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading, serverErrors } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (serverErrors) dispatch(clearServerErrors());
    };
  }, [serverErrors, dispatch]);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<ILogin>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    dispatch(clearServerErrors());
    const result = await dispatch(loginUser(data));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  const clearField = (field: string) => {
    reset({ [field]: '' });
  };

  return (
    <>
      {serverErrors?.errortext && <Error errorText={serverErrors?.errortext} />}
      <ContainerForm mobile onSubmit={handleSubmit(onSubmit)}>
        <TitleForm>Sign In</TitleForm>

        <div className={cl['form-fields']}>
          <InputBox
            type="text"
            textLabel="Email address"
            errors={errors.email?.message}
            label="email"
            register={register}
            clearField={() => clearField('email')}
            placeholder="Email address"
          />
          <InputBox
            type="password"
            textLabel="Password"
            errors={errors.password?.message}
            label="password"
            register={register}
            placeholder="Password"
          />
        </div>

        <div className={cl['server-errors']}>
          {serverErrors?.['email or password'] && `email or password ${serverErrors?.['email or password']}`}
        </div>

        <ButtonFull disabled={isLoading} type="submit">
          Login
        </ButtonFull>

        <div className={cl['form-bottom']}>
          Don’t have an account?{' '}
          <Link className={cl['form-link']} to="/sign-up">
            Sign Up.
          </Link>
        </div>
      </ContainerForm>
    </>
  );
};
