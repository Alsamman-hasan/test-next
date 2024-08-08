"use client";

import Dialog from '@mui/material/Dialog';
import cls from "./AddPostModal.module.scss";
import { HStack, VStack } from '@/shared/ui/Stack';
import { ButtonUi } from '@/shared/ui/Buttons/ButtonUi';
import { Input } from '@/shared/ui/Inputs';
import { Htag } from '@/shared/ui/Htage/Htage';
import { useCallback, useEffect, useState } from 'react';
import { useUpdateForm } from '../../model/lib/useUpdateForm';
import { errorHandler, errorMessage } from '@/shared/lib/ErrorHandlers/errorHandler';
import { useCreatePost } from '@/shared/lib/hooks';
import { useRouter } from 'next/navigation';

export interface AddPostModalProps {
  open: boolean;
  onClose: () => void;
}
const AddPostModal = (props: AddPostModalProps) => {
  const { onClose, open } = props;
  const [error, setError] = useState<string[]>([])
  const {push} = useRouter()
  const handelError = (err:string[]) => {
    setError(err)
  }
  const { formData, onChangeData } = useUpdateForm(error, handelError)
  const create = useCreatePost(formData)

  const onCreatePost = useCallback(() => {
    const err = errorHandler(formData, ['body', 'title']);
    if (err) {
      handelError(err);
    } else {
      create.mutate()
      if(create.isSuccess) {
        onClose()
      }
    }
  }, [onClose, create])

  useEffect(() => {
    if (create.isSuccess) {
      push(`/Posts/${create.data.id}`)
      onClose()
    }
  }, [create, onClose, push])
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      style={{overflow: 'hidden'}}
    >
      <VStack max align='center'  gap={4} className={cls.AddPostModal}>
        <Htag tage='h2'> создать пост</Htag>
        <HStack max gap={2}>
          <Input
            required
            placeholder='заголовок'
            type='text'
            value={formData?.title || ''}
            name='title'
            label='заголовок'
            error={error?.includes('title')}
            errorMessage={errorMessage('title', 'Заголовок', error)}
            onChange={value => onChangeData(value, 'title')}
          />
          <Input
            required
            error={error?.includes('body')}
            placeholder='подзаголовок'
            value={formData?.body || ''}
            type='text'
            name='subtitle'
            label='подзаголовок'
            errorMessage={errorMessage('body', 'подзаголовок', error)}
            onChange={value => onChangeData(value, 'body')}
          />
        </HStack>
        <HStack max justify='between' gap={0.5}>
          <ButtonUi
            className={cls.btn}
            name='main'
            layOut='TextOnly'
            theme='secondary'
            isLoading={create.isPending}
            disabled={create.isPending}
            onClick={onClose}
            >
            отменить
            </ButtonUi>
            <ButtonUi
              className={cls.btn}
              name='second'
              layOut='TextOnly'
              theme='primary'
              isLoading={create.isPending}
              disabled={create.isPending}
              onClick={onCreatePost}
            >
              добавить
            </ButtonUi>
          </HStack>
        </VStack>
      </Dialog>
  );
};
export default AddPostModal