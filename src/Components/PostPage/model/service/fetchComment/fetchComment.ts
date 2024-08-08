import {  useQuery } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack';
import { CommentItem } from '../../types/comment';
import { $api } from '@/shared/api/api';



async function fetchComment(postId?: string): Promise<CommentItem[]> {
  const response = $api.get(
    `/comments?postId=${postId}`,
  )
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      enqueueSnackbar('Что-то пошло не так...', {
        variant: 'error',
      });
    });

  return response;
}

const usePostComments = (id?: string) => {
  return useQuery({
    queryKey: ['comment', id],
    queryFn: () => fetchComment(id),
  })
}

export { usePostComments }