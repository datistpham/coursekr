import axios from "axios"
import { API_URL } from "../config"
import Cookies from "js-cookie"

const get_like_course= async (course_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/course/like",
        params: {
            course_id
        },
        method: "get",
        headers: {
            "Authorization": "Bearer "+ Cookies.get("accessToken"),
        }
    })
    const result= await res.data
    return result
}

export default get_like_course