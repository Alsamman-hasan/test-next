"use client";

import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./PostPage.module.scss";
import { useParams } from 'next/navigation';
import { usePostComments } from '../model/service/fetchComment/fetchComment';
import { usePost } from '../model/service/fechPost/fechPost';
import { Htag } from '@/shared/ui/Htage/Htage';
import { Loader } from '@/shared/ui/Loader/LoaderUi';
import { HStack, VStack } from '@/shared/ui/Stack';
import { PTag } from '@/shared/ui/Paragraph/P';
import Image from 'next/image';
import { Comments } from './Comments/Comments';

export interface PostPageProps {
  className?: string;
}
export const PostPage = (props: PostPageProps) => {
  const { className } = props;
  const params = useParams<{ slug:string}>()
  const { data, isPending, isError } = usePost(params?.slug)


  if (isPending) return <Loader />;
  if (isError) return <div>Sorry There was an Error</div>;
  return (
    <VStack gap={2} className={classNames(cls.PostPage, {}, [className])}>
      <HStack max justify='center'>
        <Image 
        alt='test' 
        loader={() => `https://via.assets.so/furniture.png?id=${params?.slug}&q=95&w=360&h=360&fit=fill`} 
        src={`https://via.assets.so/furniture.png?id=${params?.slug}&q=95&w=360&h=360&fit=fill`}
        width={300}
        height={300}
        />
      </HStack>
      <Htag style={{ textAlign: 'center' }} tage='h2'>{data?.title}</Htag>
      <PTag style={{textAlign: 'center'}} tage='P1'>{data?.body}</PTag>
      <Comments id={params?.slug}/>
    </VStack>
  );
};
