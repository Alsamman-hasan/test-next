import { $api } from '@/shared/api/api';
import { useQuery } from '@tanstack/react-query'

const fetchPost = async (id?: string): Promise<Post> => {
  const response = await $api.get(`/posts/${id}`)
  const data = await response.data
  return data;
}


const usePost = (id?: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
  })
}


export { usePost }