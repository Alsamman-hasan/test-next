import { useMutation, useQuery } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack';

interface Response {
  posts: Post[];
  totalPages: number;
}

function paginate(array:Post[], page: number, step: number) {
  const startIndex = (page - 1) * step;
  return array.slice(startIndex, startIndex + step);
}

const fetchPosts = async (page = 1, step = 10): Promise<Response> => {
  const response = await fetch(`${process.env.API_URL}/posts`)
  const data = await response.json()
  const totalPages = data.length;
  const posts = paginate(data, page, step)

  return  {
    posts,
    totalPages
  }
}

async function createPost(params: Post) {
  const response = fetch(
    `${process.env.API_URL}/posts`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ ...params, userId: 1, })
    }
  )
    .then((response) => {
      enqueueSnackbar('пост добавлен', {
        variant: 'success',
      });
      return response.json()})
    .catch((err) =>{
      enqueueSnackbar('Что-то пошло не так...', {
        variant: 'error',
      });
    });

  return response;
}


const usePosts = (page: number, step: number) => {
  return useQuery({
    queryKey: ['posts', page, step],
    queryFn: () => fetchPosts(page, step),
  })
}


const useCreatePost = (params: Post) => {
  return useMutation({
    mutationFn: () => createPost(params),
  })
}
export { usePosts, fetchPosts, useCreatePost }