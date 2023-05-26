import axios from "axios"
import { API_URL } from "../config"
import Cookies from "js-cookie"

const loginApi= async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/login",
        method: "post",
        data: {
            ...data
        },
        headers: {
            "Authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result
}

export default loginApi