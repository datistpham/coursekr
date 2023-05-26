import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
// import loginApi from "../api/login";
// import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import VideoInput from "./VideoInput";
import uploadApi from "../api/upload_video";
import createCourse from "../api/create_course";

export default function UploadCourse() {
  const [open, setOpen] = React.useState(false);
  const [video, setVideo] = React.useState();
  const [courseTitle, setCourseTitle] = React.useState("");
  const [courseDescription, setCourseDescription] = React.useState("");
  // eslint-disable-next-line
  const [courseUserIdCreated, setCourseUserIdCreated] = React.useState("");
  // eslint-disable-next-line
  const [courseThumbUrl, setCourseThumbUrl] = React.useState("");
  const [courseCategory, setCourseCategory]= React.useState(0)

  const { enqueueSnackbar } = useSnackbar();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ padding: 10 }}>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ padding: 10 }}
      >
        Create course
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Create course"}</DialogTitle>
        <DialogContent>
          <VideoInput
            setCourseThumbUrl={setCourseThumbUrl}
            setVideo={setVideo}
            video={video}
            height={300}
          />
          <TextField
            style={{ width: "100%", height: 40, margin: "16px 0" }}
            value={courseTitle}
            onChange={(e) => {
              e.preventDefault();
              setCourseTitle(e.target.value);
            }}
            placeholder="Course title"
          />
          <TextField
            style={{ width: "100%", height: 40, margin: "16px 0" }}
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            placeholder="Course description"
          />
          <div></div><br /><div></div>
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
                const data = new FormData();
                data.append("video", video);
                const result = await uploadApi(data);
                const result1 = await createCourse({
                  course_title: courseTitle,
                  course_video_url: result.filename,
                  course_description: courseDescription,
                  course_category: courseCategory
                });

                if (result1?.ok === true) {
                  enqueueSnackbar(result1?.message, {
                    variant: "success",
                  });
                  window.location.reload();
                } else {
                  enqueueSnackbar(result1?.message, {
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
            Create course
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
