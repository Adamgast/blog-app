import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { clearServerErrors, loginUser } from '../../store/userSlice';
import { ButtonFull } from '../../../../ui/atoms/button-full/ButtonFull';
import { ContainerForm } from '../../../../ui/atoms/container-form/ContainerForm';
import { TitleForm } from '../../../../ui/atoms/title-form/TitleForm';
import { Label } from '../../../../ui/atoms/label/Label';
import { ILogin } from '../../models/ILogin';
import cl from './LoginForm.module.scss';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading, serverErrors } = useAppSelector((state) => state.user);

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
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: ILogin) => {
    dispatch(clearServerErrors());
    dispatch(loginUser(data));
  };

  return (
    <ContainerForm onSubmit={handleSubmit(onSubmit)}>
      <TitleForm>Sign In</TitleForm>

      <div className={cl['form-fields']}>
        <div className={cl['input-box']}>
          <Label id="email">Email address</Label>
          <input
            type="text"
            id="email"
            placeholder="Email address"
            {...register('email')}
            className={`${cl['input-field']} ${
              (errors.email || serverErrors?.['email or password']) && cl['input-error']
            }`}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div className={cl['input-box']}>
          <Label id="password">Password</Label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register('password')}
            className={`${cl['input-field']} ${
              (errors.password || serverErrors?.['email or password']) && cl['input-error']
            }`}
          />
          <p>{errors.password?.message}</p>
        </div>
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
  );
};
