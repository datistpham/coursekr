import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, MenuItem, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { AppContext } from '../App';

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const {user }= React.useContext(AppContext)
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={()=> handleClickOpen()}>
          <Avatar /> Profile
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
            <Box
                component="img"
                sx={{
                    height: 80,
                    width: 80,
                    maxHeight: { xs: 80, md: 80 },
                    maxWidth: { xs: 80, md: 80 },
                    borderRadius: "50%"
                }}
                alt="The house from the offer."
                src={user?.avatar}
            />
            <div style={{margin: "12px 0"}}>{user?.full_name || "_"}</div>
            <label style={{width: '100%'}}>Email</label>
            <TextField fullWidth value={user?.email} disabled />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}