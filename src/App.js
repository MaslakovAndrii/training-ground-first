import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context";
import AppRouter from "./components/AppRouter/AppRouter";
import Navbar from "./components/UI/Navbar/Navbar";


import './style/App.css'


function App() {
     
     const [isAuth, setIsAuth] = useState(false)
     const [isLoading, setIsLoading] = useState(true)

     useEffect(() => {
          if(localStorage.getItem('auth')){
               setIsAuth(true)
          }
          setIsLoading(false)
     }, [])

     return (
          <AuthContext.Provider value={{
               isAuth,
               setIsAuth,
               isLoading 
          }}>
          {/*  изменил BrowserRouter на HashRouter чтобы корректно отображался проек на гитхаб */}
               <HashRouter>
                    <Navbar />
                    <AppRouter />
               </HashRouter>
          </AuthContext.Provider>
     )
}

export default App;
