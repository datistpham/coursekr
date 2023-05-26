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

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login"}</DialogTitle>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={"password"}
            style={{ margin: "12px 0", height: 40, width: 550 }}
            placeholder={"Password"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            variant={"contained"}
            onClick={async () => {
              try {
                const result = await loginApi({ email, password });
                if (result?.ok === true) {
                  Cookies.set("accessToken", result?.token);
                  Cookies.set("uid", result.uid)
                  window.location.reload();
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
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
