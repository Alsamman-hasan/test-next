import { useQuery } from '@tanstack/react-query'

const fetchPost = async (id?: string): Promise<Post> => {
  const response = await fetch(`${process.env.API_URL}/posts/${id}`)
  const data = await response.json()
  return data;
}


const usePost = (id?: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
  })
}


export { usePost }