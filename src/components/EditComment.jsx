import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../config';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

export default function EditComment(props) {
    const {id }= useParams()
    const [course_interaction_comment_id, set_course_interaction_comment_id]= React.useState(props?.course_interaction_comment_id)
  const [open, setOpen] = React.useState(false);
  const [comment, setComment]= React.useState(props?.comment)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(()=> {
    setComment(props?.comment)
  }, [props?.comment])
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit comment"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField value={comment} onChange={(e)=> setComment(e.target.value)} style={{width: 500, height: 40, margin: "12px 0"}}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={async ()=> {
            const res= await axios({
                url: API_URL+ "/api/v1/comment",
                method: "put",
                headers: {
                    "Authorization": "Bearer "+ Cookies.get("accessToken")
                },
                data: {
                    course_id: id,
                    comment: comment,
                    user_id_post: Cookies.get("uid"),
                    course_interaction_comment_id
                }
            })
            const result= await res.data
            if(result?.ok=== true) {
                props?.setChange(prev=> !prev)
                handleClose()
            }
            else{ 
                swal("Notice", "Error", "error")
            }
            return result
          }} autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}