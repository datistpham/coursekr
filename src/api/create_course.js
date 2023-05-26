import axios from "axios"
import { API_URL } from "../config"
import Cookies from "js-cookie"

const createCourse= async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/v2/upload-course",
        method: "post",
        data: {
            ...data
        },
        headers: {
            "Authorization": "Bearer "+ Cookies.get("accessToken"),
        }
    })
    const result= await res.data
    return result
}

export default createCourse