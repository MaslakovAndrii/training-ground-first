import { useMemo } from "react";


export const useSortedPosts = (posts, sort) => {
     const sortedPosts = useMemo(() => {
          if (sort) {
               [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
          }
          return posts;
     }, [sort, posts])

     return sortedPosts;
}

export const usePosts = (posts, sort, search) => {

     const sortedPosts = useSortedPosts(posts, sort)

     const sortedAndFilterPosts = useMemo(() => {
          return sortedPosts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
     }, [search, sortedPosts])

     return sortedAndFilterPosts
}