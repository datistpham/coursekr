import Cookies from 'js-cookie'
import moment from 'moment/moment'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import swal from 'sweetalert'
// import { v4 } from 'uuid'
import get_comment_course from '../api/get_comment_course'
import post_comment from '../api/post_comment'
import EditComment from './EditComment'
import { AppContext } from '../App'
import {Button as ButtonMui } from "@mui/material"
import axios from 'axios'
import { API_URL } from '../config'

const CommentComponent = () => {
    const [content, setContent]= useState("")
    const {id }= useParams()
    const [comment, setComment]= useState()
    const [change, setChange]= useState(false)
    const {user }= useContext(AppContext)
    
    useEffect(()=> {
        (async ()=> {
            const result= await get_comment_course(id)
            setComment(result?.data.reverse())
        })()
    }, [id, change])
    return (
        <Comment.Group className={"comment-container"}>
            <Header as='h2' dividing>
                Comments
            </Header>
            {
                comment?.length <= 0 && <div style={{padding: 20, textAlign: "center", fontWeight: 600, fontSize: 18}}>
                    No more comment. Let's become to first person comment
                </div>
            }
            {
                comment?.length >0 && comment?.map((item, key)=> <Comment key={key}>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>{item?.full_name}</Comment.Author>
                    <Comment.Metadata>
                        <div>{moment(item?.time_created).format("DD/MM/YYYY HH:mm")}</div>
                    </Comment.Metadata>
                    {
                        parseInt(item?.user_id_post) === parseInt(Cookies.get("uid")) && 
                        <Comment.Metadata>
                            <EditComment {...item} setChange={setChange} />
                        </Comment.Metadata> 
                    }
                    {
                        (parseInt(user?.role_id) > 2 || parseInt(item?.user_id_post) === parseInt(Cookies.get("uid"))) && 
                        <Comment.Metadata>
                            <ButtonMui onClick={()=> {
                                swal("Notice", "Are you sure want to delete this comment? ", {buttons: {
                                    ok: "Delete",
                                    cancel: "Cancel"
                                }})
                                .then(async value=> {
                                    if(value === "ok") {
                                        const res= await axios({
                                            url: API_URL+ "/api/v1/comment",
                                            method: "DELETE",
                                            headers: {
                                                "Authorization": "Bearer "+ Cookies.get("accessToken")
                                            },
                                            data: {
                                                comment_id: item?.course_interaction_comment_id
                                            }
                                        })
                                        const result= await res.data
                                        if(result?.ok=== true) {
                                            swal("Notice", "Delete comment successfully", "success")
                                            .then(()=> setChange(!change))
                                        }
                                        else {
                                            swal("Notice", "Error", "error")

                                        }
                                    }
                                    else {
                                        return null
                                    }
                                })
                            }} color={"error"} variant={"outlined"} >Delete</ButtonMui>
                        </Comment.Metadata> 
                    }
                    <Comment.Text>{item?.comment}</Comment.Text>
                </Comment.Content>
            </Comment>)
            }
            <Form reply>
                <Form.TextArea value={content} onChange={(e)=> setContent(e.target.value)} placeholder={"Write a comment"} />
                <Button onClick={async ()=> {
                    if(content.trim().length <= 0) {
                        swal("Thông báo", "Bạn hãy nhập comment")
                    }
                    else {
                        // const comment_id= v4()
                        const user_id= Cookies.get("uid") || ""
                        // const time_created= new Date()
                        const result= await post_comment({course_id: id, user_id_created: user_id, comment: content})
                        if(result?.add === true) {
                            setChange(!change)
                        }
                        else {
                            swal("Thông báo", "Error", "error")
                        }
                    }
                    setContent("")
                }} content='Comment' labelPosition='left' icon='edit' primary />
            </Form>
        </Comment.Group>
    )
}

export default CommentComponent