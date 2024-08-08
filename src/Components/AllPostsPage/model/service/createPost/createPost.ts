import { $api } from '@/shared/api/api';
import { useMutation } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack';

async function createPost(params: Post) {
  const response = $api.post('/posts',
    {
      params: JSON.stringify({ ...params, userId: 1, })
    }
  )
    .then((response) => {
      enqueueSnackbar('пост добавлен', {
        variant: 'success',
      });
      return response.data
    })
    .catch((err) => {
      enqueueSnackbar('Что-то пошло не так...', {
        variant: 'error',
      });
    });

  return response;
}

export const useCreatePost = (params: Post) => {
  return useMutation({
    mutationFn: () => createPost(params),
  })
}
