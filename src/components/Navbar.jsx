import React, { useContext, useState } from "react";
// import Menu from "../assets/Menu";
// import logo from "../assets/ytLogo.png";
// import { Link } from "react-router-dom";
import { setSelectedCategory, setSidebarExtendedValue } from "../redux/categorySlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import AccountMenu from "./Menu";
import { AppContext } from "../App";
import Login from "./Login";
import { Button } from "@mui/material";
// import {RiUploadLine } from "react-icons/ri"
import UploadCourse2 from "./UploadCourse2";
import categories from '../utils/categories'
import { AiFillHome } from "react-icons/ai";
import Signup from "./Signup";

function Navbar({ sidebarExtended, setSidebarExtended }) {
  const dispatch = useDispatch();
  const pageRoute = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { isLoading } = useSelector((state) => state.category);
  const channelLoading = useSelector((state) => state.channel.isLoading);
  const videoLoading = useSelector((state) => state.video.isLoading);
  const searchLoading = useSelector((state) => state.search.isLoading);
  const { auth, user } = useContext(AppContext);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    pageRoute(`/search/${searchValue}`);
    e.target.value = " ";
  };
  const navigate= useNavigate()

  return (
    <>
      <div className="h-[120px] z-10 bg-[#ffff] w-[100%]">
        {videoLoading || channelLoading || isLoading || searchLoading ? (
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="error" />
          </Stack>
        ) : (
          ""
        )}

        <nav className="flex h-[60px] items-center space-x-2 lg:space-x-20 xl:space-x-64 justify-between">
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-4 ml-3 -mt-4 pl-2">
              <button
                className=""
                onClick={() => {
                  dispatch(setSidebarExtendedValue(!sidebarExtended));
                  setSidebarExtended(!sidebarExtended);
                  pageRoute("/")
                }}
              >
                <img src="https://dynamic.brandcrowd.com/asset/logo/d6d220a7-01c1-436f-88ad-343fbba05945/logo-search-grid-1x?logoTemplateVersion=1&v=638179036469730000&text=KOVI" style={{width: 60, height: 60, objectFit: "contain"}} alt="" />
              </button>
            </div>
            
            <Button onClick={()=> navigate("/category/1")} color={"primary"} style={{fontSize: 18}}>Vocabulary</Button>
            <Button onClick={()=> navigate("/category/0")} color={"primary"} style={{fontSize: 18}}>Grammar</Button>
          </div>
          <div className="flex items-center px-10">
            {auth === false && <Login />}
            {auth === false && <Signup />}
            {auth=== true && parseInt(user?.role_id) >= 2 && <UploadCourse2 />}
            {auth === true && <AccountMenu />}
          </div>
        </nav>
        <nav className="flex h-[40px] items-center space-x-2 lg:space-x-20 xl:space-x-64 justify-start ml-4" style={{alignItems: "center"}}>
          <div className="flex justify-center align-center gap-4" style={{alignItems: "center", cursor: "pointer"}} onClick={()=> pageRoute("/")}>
            <AiFillHome size={32} />
            <div style={{fontWeight: 600, fontSize: 18}}>Home</div>
          </div>
          <form onSubmit={handleOnSubmit} className="" style={{marginLeft: 16}}>
              <div className="relative w-[170px] sm:w-[420px] ">
                <input
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="search"
                  name="search"
                  id="default-search"
                  className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-[1px] border-[#cccccc] focus:outline-none"
                  placeholder="Search"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-0 bottom-0 top-0 font-medium text-sm px-4 py-2 bg-[#f8f8f8] border-[1px] border-[#cccccc]"
                >
                  {" "}
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
