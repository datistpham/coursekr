import { createContext, useEffect, useState } from "react";
import {
  ChannelDetails,
  Feed,
  SearchFeed,
  Sidebar,
  VideoDetails,
} from "./pages/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import authApi from "./api/auth";
import { SnackbarProvider } from 'notistack';
import Category from "./pages/Category";
import Chatbot from "./components/ChatBots";
// import { red } from "@mui/material/colors";
// import Stack from "@mui/material/Stack";
// import LinearProgress from "@mui/material/LinearProgress";
// import { createTheme } from "@mui/material/styles";
// import { useSelector } from "react-redux";
export const AppContext= createContext()

function App() {
  const [auth, setAuth]= useState()
  const [user, setUser]= useState()
  useEffect(()=> {
    (async ()=> {
      try {
        const result= await authApi()
        setUser(result)
        setAuth(result?.auth)
      } catch (error) {
        setAuth(false)
      }
    })()
  }, [])
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}>
      <AppContext.Provider value={{auth, user}}>
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/feed/:id" element={<Feed />} />
            <Route path="/channel/:id" element={<ChannelDetails />} />
            <Route path="/search/:id" element={<SearchFeed />} />
            <Route path="/watch/:id" element={<VideoDetails />} />
            <Route path={"/category/:id"} element={<Category />} />
          </Routes>
          <Chatbot />
        </Router>
      </AppContext.Provider>
    </SnackbarProvider>
  );
}

export default App;
