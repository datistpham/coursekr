import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import loginApi from "../api/login";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import signupApi from "../api/signup";
import swal from "sweetalert";


export default function Signup() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [fullName, setFullName]= React.useState("")
  const [password, setPassword] = React.useState("");
    const [userName, setUserName]= React.useState("")
  const { enqueueSnackbar } = useSnackbar();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{marginLeft: 12}}>
        Singup
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Signup"}</DialogTitle>
        <DialogContent>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: "12px 0", height: 40, width: 550 }}
            placeholder={"Email"}
          />
           <div></div>
          <br />
          <div></div>
          <TextField
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type={"text"}
            style={{ margin: "12px 0", height: 40, width: 550 }}
            placeholder={"Full name"}
          />
          <div></div>
          <br />
          <div></div>
          <TextField
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type={"text"}
            style={{ margin: "12px 0", height: 40, width: 550 }}
            placeholder={"User name"}
          />
          <div></div>
          <br />
          <div></div>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={"password"}
            style={{ margin: "12px 0", height: 40, width: 550 }}
            placeholder={"Password"}
          />
               <div></div>
          <br />
          <div></div>
              <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={courseCategory}
              label="Age"
              onChange={(e)=> setCourseCategory(parseInt(e.target.value))}
            >
              <MenuItem value={0}>Vocabulary</MenuItem>
              <MenuItem value={1}>Grammar</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            variant={"contained"}
            onClick={async () => {
              try {
                const result = await signupApi({ email, password, full_name: fullName, user_name: userName });
                if (result?.ok === true) {
                  swal("Notice", "Sign up is successfully", "success")
                  .then(()=>  window.location.reload())
                } else {
                  enqueueSnackbar(result?.message, {
                    variant: "error",
                  });
                }
              } catch (e) {
                enqueueSnackbar(e?.response?.data?.message, {
                  variant: "error",
                });
              }
            }}
            autoFocus
          >
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
