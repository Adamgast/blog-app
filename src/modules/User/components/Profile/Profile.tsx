import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { clearServerErrors, uploadUser } from '../../store/userSlice';
import { ButtonFull } from '../../../../ui/atoms/button-full/ButtonFull';
import { ContainerForm } from '../../../../ui/atoms/container-form/ContainerForm';
import { TitleForm } from '../../../../ui/atoms/title-form/TitleForm';
import { Label } from '../../../../ui/atoms/label/Label';
import { IProfile } from '../../models/IProfile';
import cl from './Profile.module.scss';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { isLoading, serverErrors, currentUser } = useAppSelector((state) => state.user);

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
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: IProfile) => {
    dispatch(clearServerErrors());
    dispatch(uploadUser(data));
  };

  return (
    <ContainerForm onSubmit={handleSubmit(onSubmit)}>
      <TitleForm>Edit Profile</TitleForm>

      <div className={cl['form-fields']}>
        <div className={cl['input-box']}>
          <Label id="userName">Username</Label>
          <input
            type="text"
            id="userName"
            placeholder="Username"
            defaultValue={currentUser?.username}
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
            defaultValue={currentUser?.email}
            {...register('email')}
            className={`${cl['input-field']} ${(errors.email || serverErrors?.email) && cl['input-error']}`}
          />
          <p>{errors.email?.message}</p>
          <p>{serverErrors?.email && `email ${serverErrors?.email}`}</p>
        </div>
        <div className={cl['input-box']}>
          <Label id="newPassword">New password</Label>
          <input
            type="password"
            id="newPassword"
            placeholder="New password"
            {...register('newpassword')}
            className={`${cl['input-field']} ${errors.newpassword && cl['input-error']}`}
          />
          <p>{errors.newpassword?.message}</p>
        </div>
        <div className={cl['input-box']}>
          <Label id="avatarImage">Avatar image (url)</Label>
          <input
            type="text"
            id="avatarImage"
            placeholder="Avatar image"
            defaultValue={currentUser?.image}
            {...register('image')}
            className={`${cl['input-field']} ${errors.image && cl['input-error']}`}
          />
          <p>{errors.image?.message}</p>
        </div>
      </div>

      <ButtonFull disabled={isLoading} type="submit">
        Save
      </ButtonFull>
    </ContainerForm>
  );
};
