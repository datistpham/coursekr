import axios from "axios"
import { API_URL } from "../config"
import Cookies from "js-cookie"

const uploadApi= async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/upload-media",
        method: "post",
        data: data,
        headers: {
            "Authorization": "Bearer "+ Cookies.get("accessToken"),
            "Content-Type": "multipart/form-data"
        }
    })
    const result= await res.data
    return result
}

export default uploadApi