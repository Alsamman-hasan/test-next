import { $api } from '@/shared/api/api';
import { useQuery } from '@tanstack/react-query'
interface Response {
  posts: Post[];
  totalPages: number;
}

function paginate(array: Post[], page: number, step: number) {
  const startIndex = (page - 1) * step;
  return array.slice(startIndex, startIndex + step);
}

const fetchPosts = async (page = 1, step = 10): Promise<Response> => {
  const response = await $api.get(`/posts`)
  const data = await response.data
  const totalPages = data.length;
  const posts = paginate(data, page, step)

  return {
    posts,
    totalPages
  }
}

export const usePosts = (page: number, step: number) => {
  return useQuery({
    queryKey: ['posts', page, step],
    queryFn: () => fetchPosts(page, step),
  })
}