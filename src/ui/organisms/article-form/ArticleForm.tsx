import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { createNewArticle, editArticle } from '../../../modules/Article/store/articleSlice';
import { IArticle } from '../../../modules/Article/models/IArticle';
import { ArticleFormValues } from '../../../modules/Article/models/ArticleFormValues';
import { validArticle } from '../../../utils/valid-article';
import { Error } from '../../molecules/error/Error';
import { InputBox } from '../../molecules/input-box/InputBox';
import { TextAreaBox } from '../../molecules/textarea-box/TextAreaBox';
import { ButtonFull } from '../../atoms/button-full/ButtonFull';
import { ContainerForm } from '../../atoms/container-form/ContainerForm';
import { TitleForm } from '../../atoms/title-form/TitleForm';
import { ButtonBorder } from '../../atoms/button-border/ButtonBorder';
import { Label } from '../../atoms/label/Label';
import cl from './ArticleForm.module.scss';

interface ArticleFormProps {
  slug?: string;
  defaultValues?: ArticleFormValues;
}

export const ArticleForm = ({ slug, defaultValues }: ArticleFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isError } = useAppSelector((state) => state.articleFull);

  const tagSchema = {
    name: yup.string().trim().max(15).required(),
  };

  const schema = yup.object().shape({
    title: yup.string().trim().max(100).required(),
    description: yup.string().trim().max(200).required('short description is a requred field'),
    body: yup.string().trim().required('text is a required field'),
    tags: yup.array().of(yup.object().shape(tagSchema)),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
    setError,
  } = useForm<ArticleFormValues>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  const onSubmit: SubmitHandler<ArticleFormValues> = async (data) => {
    const value: string | IArticle = validArticle(data);
    if (typeof value === 'string') {
      setError('tags', { message: value });
    } else {
      const article: IArticle = value;
      if (slug) {
        const result = await dispatch(editArticle({ slug, article }));
        if (result.meta.requestStatus === 'fulfilled') {
          navigate(`/articles/${slug}`);
        }
      } else {
        const result = await dispatch(createNewArticle(article));
        if (result.meta.requestStatus === 'fulfilled') {
          navigate('/');
        }
      }
    }
  };

  const appendTag = () => {
    if (!fields.length || getValues(`tags.${fields.length - 1}.name`).trim() !== '') {
      append({ name: '' });
    }
  };

  return (
    <>
      {isError && <Error errorText={isError} />}
      <ContainerForm onSubmit={handleSubmit(onSubmit)}>
        <TitleForm>Create new article</TitleForm>
        <div className={cl['form-fields']}>
          <InputBox
            type="text"
            textLabel="Title"
            placeholder="Title"
            errors={errors.title?.message}
            label="title"
            register={register}
          />
          <InputBox
            type="text"
            textLabel="Short description"
            placeholder="Title"
            errors={errors.description?.message}
            label="description"
            register={register}
          />
          <TextAreaBox
            textLabel="Text"
            placeholder="Text"
            errors={errors.body?.message}
            label="body"
            register={register}
          />
        </div>

        <div className={cl['form-tagsBox']}>
          <div className={cl['form-tags']}>
            <Label>Tags</Label>
            {errors.tags?.message && <p>{errors.tags?.message}</p>}
            {fields.map((field, index) => (
              <div key={field.id} className={cl['form-tag']}>
                <input
                  type="text"
                  placeholder="Tag"
                  {...register(`tags.${index}.name` as const)}
                  className={`${cl['input-field']} ${errors?.tags?.[index]?.name ? cl['input-error'] : ''}`}
                />

                <ButtonBorder onClick={() => remove(index)} color="red">
                  Delete
                </ButtonBorder>
              </div>
            ))}
          </div>

          <div className={cl['btn-container']}>
            <ButtonBorder onClick={appendTag} color="blue">
              Add tag
            </ButtonBorder>
          </div>
        </div>

        <ButtonFull min="min" disabled={isLoading} type="submit">
          Send
        </ButtonFull>
      </ContainerForm>
    </>
  );
};
