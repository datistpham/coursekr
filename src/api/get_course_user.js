import axios from "axios"
import { API_URL } from "../config"
import Cookies from "js-cookie"

const get_course_user= async (user_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/channel",
        params: {
            user_id
        },
        method: "get",
        headers: {
            "Authorization": "Bearer "+ Cookies.get("accessToken"),
        }
    })
    const result= await res.data
    return result
}

export default get_course_user