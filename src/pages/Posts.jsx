import React, { useEffect, useRef, useState } from "react";

// custom hooks
import { usePosts } from "../hooks/usePost";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";
// components
import Pagination from "../components/UI/Pagination/Pagination";
import PostsFilter from "../components/PostsFilter";
import AddPost from "../components/AddPost";
import PostList from '../components/PostList';
import PostService from "../API/PostService";
// UI components
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/Loader/Loader";
// utils
import { getPagesCount } from "../utils/pages";

import '../style/App.css'
import MySelect from "../components/UI/select/MySelect";



function Posts() {

     const [posts, setPosts] = useState([])

     const [filter, setFilter] = useState({ sort: '', search: '' })
     const [modal, setModal] = useState(false)
     const [totalPages, setTotalPages] = useState(0)
     const [limit, setLimit] = useState(10)
     const [page, setPage] = useState(1)
     const sortedAndFilterPosts = usePosts(posts, filter.sort, filter.search)
     const lastElement = useRef()


     const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
          const response = await PostService.getAll(limit, page);
          setPosts([...posts, ...response.data])
          const totalCount = response.headers['x-total-count']
          setTotalPages(getPagesCount(totalCount, limit))
     })

     useObserver(lastElement, page < totalPages, isPostsLoading, () => {
          setPage( page + 1)
     })
     

     useEffect(() => {
          fetchPosts(limit, page)
     }, [page, limit])

     const createPost = (newPost) => {
          setPosts([...posts, newPost])
          setModal(false)
     }

     const removePost = (post) => {
          setPosts(posts.filter(p => p.id !== post.id))
     }

     const changePage = (page) => {
          setPage(page)
     }

     return (
          <div className="App">
               <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
                    Создать пост
               </MyButton>
               <MyModal visible={modal} setVisible={setModal}>
                    <AddPost create={createPost} />
               </MyModal>

               <hr style={{ margin: '15px 0' }} />
               <PostsFilter
                    filter={filter}
                    setFilter={setFilter}
               />
               <MySelect 
                    value={limit}
                    onChange={value => setLimit(value)}
                    defaultValue='Количество элементов на странице'
                    options={[
                         {value: 5, name: '5'},
                         {value: 10, name: '10'},
                         {value: 15, name: '15'},
                         {value: 20, name: '20'},
                         {value: -1, name: 'Показать все'}
                    ]}
               />
               {postError &&
                    <h1 style={{ color: 'red', fontWeight: '900' }}>ERROR ${postError}</h1>}
               <PostList remove={removePost} posts={sortedAndFilterPosts} title={'Список постов 1'} />
               <div ref={lastElement}></div>
               {isPostsLoading &&
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}><Loader /></div>
               }
               <Pagination
                    totalPages={totalPages}
                    page={page}
                    changePage={changePage}
               />
          </div>
     );
}

export default Posts;
