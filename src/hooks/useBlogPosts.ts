import { useQuery } from '@tanstack/react-query'
import { blogService } from '@/lib/services'

export function useBlogPosts() {
  const { data: recentPosts, isLoading: isLoadingRecent } = useQuery({
    queryKey: ['posts', 'recent'],
    queryFn: () => blogService.getRecentPosts()
  })

  const { data: popularPosts, isLoading: isLoadingPopular } = useQuery({
    queryKey: ['posts', 'popular'],
    queryFn: () => blogService.getPopularPosts()
  })

  return {
    recentPosts,
    popularPosts,
    isLoading: isLoadingRecent || isLoadingPopular
  }
}