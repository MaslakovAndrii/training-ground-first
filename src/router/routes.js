import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPages from "../pages/PostPage";
import Login from "../pages/Login";
// import PageError from "../pages/PageError";


export const privateRoutes = [
     { path: '/posts', element: <Posts /> },
     { path: '/posts/:id', element: <PostIdPages /> },
     { path: '/about', element: <About />},
     // { path: '/page-error', element: <PageError />},
     // { path: '/login', element: <Login /> }
]
export const publicRoutes = [
     { path: '/login', element: <Login /> }
]