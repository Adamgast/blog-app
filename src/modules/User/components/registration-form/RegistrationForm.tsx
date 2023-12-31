import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { Error } from '../../../../ui/molecules/error/Error';
import { InputBox } from '../../../../ui/molecules/input-box/InputBox';
import { ButtonFull } from '../../../../ui/atoms/button-full/ButtonFull';
import { ContainerForm } from '../../../../ui/atoms/container-form/ContainerForm';
import { TitleForm } from '../../../../ui/atoms/title-form/TitleForm';
import { IRegist } from '../../models/IRegist';
import { clearServerErrors, registrationUser } from '../../store/userSlice';
import cl from './RegistrationForm.module.scss';

export const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading, serverErrors } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

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
    checkbox: yup.boolean().oneOf([true]).required(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IRegist>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<IRegist> = async (data) => {
    dispatch(clearServerErrors());
    const result = await dispatch(registrationUser(data));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/sign-in');
    }
  };

  const clearField = (field: string) => {
    reset({ [field]: '' });
  };

  return (
    <>
      {serverErrors?.errortext && <Error errorText={serverErrors?.errortext} />}
      <ContainerForm mobile onSubmit={handleSubmit(onSubmit)}>
        <TitleForm>Create new account</TitleForm>

        <div className={cl['form-fields']}>
          <InputBox
            type="text"
            textLabel="Username"
            placeholder="Username"
            errors={errors.username?.message}
            serverErrors={serverErrors?.username}
            label="username"
            register={register}
            clearField={() => clearField('username')}
          />
          <InputBox
            type="text"
            textLabel="Email address"
            placeholder="Email address"
            errors={errors.email?.message}
            serverErrors={serverErrors?.email}
            label="email"
            register={register}
            clearField={() => clearField('email')}
          />
          <InputBox
            type="password"
            textLabel="Password"
            placeholder="Password"
            errors={errors.password?.message}
            label="password"
            register={register}
          />
          <InputBox
            type="password"
            textLabel="Repeat Password"
            placeholder="Password"
            errors={errors.repeatPassword?.message}
            label="repeatPassword"
            register={register}
          />
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
    </>
  );
};
