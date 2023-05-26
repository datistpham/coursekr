import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { AppContext } from '../App';
import uploadApi from '../api/upload_video';
import update_profile_user from '../api/update_profile_user';
import swal from 'sweetalert';
import { API_URL } from '../config';

export default function UpdateProfile() {
  const [open, setOpen] = React.useState(false);
  const {user }= React.useContext(AppContext)
  const [avatar, setAvatar] =React.useState()
  const [coverPicture, setCoverPicture]= React.useState()
  const [email, setEmail]= React.useState()
  const [fullName, setFullName]= React.useState()
  const [certificate, setCertificate]= React.useState()

  React.useEffect(()=> {
    setEmail(user?.email)
    setFullName(user?.full_name)
  }, [user])
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={()=> handleClickOpen()}>
          <Avatar />Update Profile
        </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Profile"}
        </DialogTitle>
        <DialogContent style={{width: 600}}>
          <DialogContentText id="alert-dialog-description" style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <div style={{width: "100%"}}><label htmlFor="">Avatar</label></div>
            <input type="file" onChange={(e)=> setAvatar(e.target.files[0])} style={{width: "100%", margin: "12px 0"}} />
            <div style={{width: "100%"}}><label htmlFor="">Cover picture</label></div>
            <input type="file" onChange={(e)=> setCoverPicture(e.target.files[0])} style={{width: "100%", margin: "12px 0"}} />
            <label style={{width: '100%'}}>Full name</label>
            <TextField fullWidth value={fullName} onChange={(e)=> setFullName(e.target.value)} />
            <div></div><br /><div></div>
            <label style={{width: '100%'}}>Email</label>
            <TextField fullWidth value={email} onChange={(e)=> setEmail(e.target.value)} />
            <div></div><br /><div></div>
            {
              parseInt(user?.role_id)>= 2 &&
              <>
                <div style={{width: "100%"}}><label htmlFor="">Certificates</label></div>
                <input type="file" onChange={(e)=> setCertificate(e.target.files[0])} style={{width: "100%", margin: "12px 0"}} />
              </>
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button variant={"contained"} onClick={async ()=> {
                if(avatar) {
                    const data= new FormData()
                    data.append("video", avatar)
                    const result1= await uploadApi(data)
                    const result2= await update_profile_user({full_name: fullName, email: email, avatar:  API_URL+ "/" +result1?.filename, cover_picture: user?.cover_picture})
                    if(result2?.ok=== true) {
                        swal("Notice", "Update user success", "success")
                    }
                    else {
                        swal("Notice", "Update user failed", )
                    }
                    handleClose()
                }
                else if(coverPicture) {
                    const data= new FormData()
                    data.append("video", coverPicture)
                    const result1= await uploadApi(data)
                    const result2= await update_profile_user({full_name: fullName, email: email, avatar: user?.avatar, cover_picture:  API_URL+ "/" +result1?.filename})
                    if(result2?.ok=== true) {
                        swal("Notice", "Update user success", "success")
                    }
                    else {
                        swal("Notice", "Update user failed", )
                    }
                    handleClose()

                }
                else if(certificate) {
                  const data= new FormData()
                    data.append("video", certificate)
                    const result= await uploadApi(data)
                    const result2= await update_profile_user({full_name: fullName, email: email, avatar: user?.avatar, cover_picture: user?.cover_picture, certificate: API_URL+ "/" +result?.filename})
                    if(result2?.ok=== true) {
                        swal("Notice", "Update user success", "success")
                    }
                    else {
                        swal("Notice", "Update user failed", )
                    }
                    handleClose()
                }
                else if(coverPicture && avatar) {
                    const data= new FormData()
                    data.append("video", coverPicture)
                    const result1= await uploadApi(data)
                    data.delete("video")
                    data.append("video", avatar)
                    const result= await uploadApi(data)
                    const result2= await update_profile_user({full_name: fullName, email: email, avatar: API_URL+ "/" + result?.filename, cover_picture: API_URL+ "/" + result1?.filename})
                    if(result2?.ok=== true) {
                        swal("Notice", "Update user success", "success")
                    }
                    else {
                        swal("Notice", "Update user failed", )
                    }
                    handleClose()

                }
                else {
                    const result2= await update_profile_user({full_name: fullName, email: email, avatar: user?.avatar, cover_picture: user?.cover_picture})
                    if(result2?.ok=== true) {
                        swal("Notice", "Update user success", "success")
                    }
                    else {
                        swal("Notice", "Update user failed", )
                    }
                    handleClose()

                }
            }}>Update</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}