import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getUser } from '../../api/getUser';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { clearServerErrors, uploadUser } from '../../store/userSlice';
import { InputBox } from '../../../../ui/molecules/input-box/InputBox';
import { ButtonFull } from '../../../../ui/atoms/button-full/ButtonFull';
import { ContainerForm } from '../../../../ui/atoms/container-form/ContainerForm';
import { TitleForm } from '../../../../ui/atoms/title-form/TitleForm';
import { IProfile } from '../../models/IProfile';
import cl from './Profile.module.scss';

export const Profile = () => {
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
    email: yup.string().email().required(),
    newpassword: yup.string().min(6).max(40),
    image: yup.string().url(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IProfile>({
    resolver: yupResolver(schema),
    defaultValues: async () => {
      const response = await getUser();
      return response.data.user;
    },
  });

  const onSubmit: SubmitHandler<IProfile> = async (data) => {
    dispatch(clearServerErrors());
    const result = await dispatch(uploadUser(data));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  return (
    <ContainerForm onSubmit={handleSubmit(onSubmit)}>
      <TitleForm>Edit Profile</TitleForm>

      <div className={cl['form-fields']}>
        <InputBox
          type="text"
          textLabel="Username"
          placeholder="Username"
          errors={errors.username?.message}
          serverErrors={serverErrors?.username}
          label="username"
          register={register}
        />
        <InputBox
          type="text"
          textLabel="Email address"
          placeholder="Email address"
          errors={errors.email?.message}
          serverErrors={serverErrors?.email}
          label="email"
          register={register}
        />
        <InputBox
          type="password"
          textLabel="New password"
          placeholder="New password"
          errors={errors.newpassword?.message}
          label="newpassword"
          register={register}
        />
        <InputBox
          type="text"
          textLabel="Avatar image (url)"
          placeholder="Avatar image"
          errors={errors.image?.message}
          label="image"
          register={register}
        />
      </div>

      <ButtonFull disabled={isLoading} type="submit">
        Save
      </ButtonFull>
    </ContainerForm>
  );
};
