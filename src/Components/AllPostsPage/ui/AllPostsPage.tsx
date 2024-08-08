"use client";

import { useCallback, useState } from 'react';
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./AllPostsPage.module.scss";
import { Loader } from '@/shared/ui/Loader/LoaderUi';
import { Htag } from '@/shared/ui/Htage/Htage';
import { HStack, VStack } from '@/shared/ui/Stack';
import { PTag } from '@/shared/ui/Paragraph/P';
import { hasPagination } from '@/shared/lib/hasPagination/hasPagination';
import { Paginations } from '@/shared/ui/PaginationUi';
import { StepsSelect } from '@/shared/ui/StepsSelect';
import Link from 'next/link';
import { ButtonUi } from '@/shared/ui/Buttons/ButtonUi';
import AddPostModal from './AddPostModal/AddPostModal';
import { usePosts } from '../model/service/fetchPosts/fetchPosts';

export interface AllPostsPageProps {
  className?: string;
}
export const AllPostsPage = (props: AllPostsPageProps) => {
  const { className } = props;
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(10)
  const { data, isPending, isError } = usePosts(page, step)
  const handleChange = useCallback(
    (newPage: number) => {
      setPage(newPage)
    },
    [],
  );
  const onChangeSteps = useCallback(
    (value: Autocomplete) => {
      setStep(value.value)
      setPage(1)
    },
    [],
  );

  const handleModalClose = useCallback(() => {
    setOpen(false);
  }, []);
  
  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  if (isPending) return <Loader />;
  if (isError) return <div>Sorry There was an Error</div>;
  return (
    <VStack max gap={4} align='center' className={classNames(cls.AllPostsPage, {}, [className])}>
      <HStack max justify='between'>
        <Htag tage='h1'> all Posts</Htag>
        <ButtonUi layOut='TextOnly' name='creater' onClick={onOpenModal}>
          create Post
        </ButtonUi>
      </HStack>
      <VStack max gap={2}>
        {data.posts.map(({id, title, body}) => (
          <Link key={id} href={`/Posts/${id}`} style={{width: '100%'}}>
            <VStack max  align='start' justify='center' className={cls.item}>
              <Htag tage='h3'>{title}</Htag>
              <PTag tage='P1'>{body}</PTag>
            </VStack>
          </Link>
        
        ))}
        {data && 
        <HStack max justify='end'>
          <Paginations
            currentPage={page}
            pageSize={step}
            totalCount={data.totalPages}
            onPageChange={handleChange}
          />
          <StepsSelect
            value={{ label: step.toString(), value: step }}
            onChange={onChangeSteps}
          />
        </HStack>}
      </VStack>
      <AddPostModal open={open} onClose={handleModalClose} />
    </VStack>
  );
};
