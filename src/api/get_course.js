import axios from "axios"
import { API_URL } from "../config"
import Cookies from "js-cookie"

const get_course= async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/course",
        method: "get",
        headers: {
            "Authorization": "Bearer "+ Cookies.get("accessToken"),
        }
    })
    const result= await res.data
    return result
}

export default get_course