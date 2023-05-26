import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
// import { getChannelVideos, getChannelDetails } from '../redux/channelSlice'
// import convertToInternationalCurrencySystem from "../utils/convert";
import timeSince from "../utils/date";
import get_course_user from "../api/get_course_user";
import { API_URL } from "../config";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Chatbot from "../components/ChatBots";
import { Box, Typography } from "@mui/material";
import { AppContext } from "../App";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ChannelDetails() {
  const { id } = useParams();
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const { sidebarExtend } = useSelector((state) => state.category);
  // const { channelDetails } = useSelector((state) => state.channel);
  // const { channelVideos } = useSelector((state) => state.channel);
  var aDay = 24 * 60 * 60 * 1000;
  // useEffect(() => {
  //   dispatch(getChannelVideos(`search?channelId=${id}&part=snippet&order=date`))
  //   dispatch(getChannelDetails(`channels?part=snippet&id=${id}`))
  // }, [id])
  const {user }= useContext(AppContext)
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await get_course_user(id);
      setData(result);
    })();
  }, [id]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div
        className={`sm:hidden overlayEffect ${
          sidebarExtend ? "block" : "hidden"
        }`}
      ></div>

      <div
        className={`pt-14 ml-4 pl-0  ${
          sidebarExtend ? "sm:pl-[180px]" : "sm:pl-[70px]"
        }`}
      >
        {/* <img style={{ backgroundSize: "cover" }} className='w-[100%] h-[100px]' src= /> */}
        <img
          className="w-[100%] h-[120px] sm:h-[160px] lg:h-[210px] bg-cover"
          style={{ background: `url(${data?.profile?.cover_picture})` }}
          alt={""}
        />
        <div className="flex gap-x-5 items-center my-5">
          <img
            className="rounded-[40px] w-12 h-12 md:w-16 md:h-16"
            src={data?.profile?.avatar}
            alt={""}
          />
          <div className="flex flex-col">
            <h3 className="text-md md:text-xl font-medium tracking-wide">
              {data?.profile?.full_name}
            </h3>
            <span style={{display: "inline-block", marginTop: 10}}> Contact: <a style={{padding: 5, background: "#f2f0f5", borderRadius: 10}} href={`mailto:${data?.profile?.email}`}>{data?.profile?.email}</a></span>
            <div className="flex flex-col">
              {/* <span className='text-[12px] md:text-[14px] tracking-wide font-[500] text-[#323232]'>{channelDetails?.snippet?.customUrl}</span> */}
              {/* <span className='text-[12px] md:text-[13px] tracking-wider -mt-1 font-[500] text-[#323232]'>{convertToInternationalCurrencySystem(channelDetails?.statistics?.subscriberCount)}</span> */}
            </div>
          </div>
        </div>
        <div>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="VIDEOS" {...a11yProps(0)} />
            <Tab label="Certificates" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
              {data?.data?.map((e, index) => {
                return (
                  <VideoCard
                    key={index + 1}
                    thumbnail={API_URL + e?.course_thumb_url}
                    width="210px"
                    title={e?.course_title}
                    channel={e?.full_name}
                    on={timeSince(new Date(Date.parse(e?.time_created) - aDay))}
                    channelId={e?.course_user_id_created}
                    videoId={e?.course_id}
                  />
                );
              })}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
              <div>
                <img style={{maxWidth: 500}} src={data?.profile?.certificate} alt="" />
              </div>
          </TabPanel>
        </div>
      </div>
    </>
  );
}

export default ChannelDetails;
