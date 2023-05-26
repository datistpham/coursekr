import axios from "axios"
import { API_URL } from "../config"
import Cookies from "js-cookie"

const get_comment_course= async (course_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/course/comment",
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

export default get_comment_course