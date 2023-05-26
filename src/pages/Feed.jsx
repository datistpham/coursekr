import React, { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom'
// import VideoCard from '../components/VideoCard'
// import { getCategoryVideos } from '../redux/categorySlice'
import { useSelector } from "react-redux";
import timeSince from "../utils/date";
import "./feed.css";
import get_course from "../api/get_course";
import { API_URL } from "../config";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { useNavigate } from "react-router-dom";
import "../pages/feed.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import _ from "lodash"

import { Navigation } from "swiper";

function Feed() {
  // const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2]= useState([])
  const { categoryVideos } = useSelector((state) => state.category);
  const { sidebarExtend } = useSelector((state) => state.category);
  console.log(categoryVideos);
  var aDay = 24 * 60 * 60 * 1000;
  useEffect(() => {
    (async () => {
      const result = await get_course();
      setData1(
        result?.data?.filter((item) => parseInt(item.course_category) === 1)
      );
      setData(
        result?.data?.filter((item) => parseInt(item.course_category) === 0)
      );
        setData2(_.orderBy(result?.data, function(e) {return parseInt(e.view_of_course)}, "desc").slice(0, 7))
    })();
  }, []);

  const settings = {
    loop: true,
    speed: 800,
    paginationClickable: true,
    spaceBetween: 30,
    slidesPerView: 5,
    autoHeight: true,
    breakpoints: {
      768: {
        spaceBetweenSlides: 10,
      },
    },
  };
  return (
    <div style={{padding: 40, paddingTop: 0}}>
      {/* <Sidebar /> */}
      <div
        className={`sm:hidden overlayEffect ${
          sidebarExtend ? "block" : "hidden"
        }`}
      ></div>
        <div style={{fontSize: 20, fontWeight: 600}}>Top courses</div>
      <div style={{ padding: 10, height: "auto" }}>
        <Swiper
          {...settings}
          navigation={true}
          autoplay={true}
          loop={true}
          modules={[Navigation]}
          className="mySwiper"
          style={{ height: "auto" }}
        >
          {data2?.map((e, index) => {
            return (
                <SwiperSlide key={index}>
                  <VideoCard
                    key={index}
                    title={e.course_title}
                    thumbnail={API_URL + e.course_thumb_url}
                    on={timeSince(new Date(Date.parse(e.time_created) - aDay))}
                    channel={e.full_name}
                    channelId={e.course_user_id_created}
                    videoId={e.course_id}
                  />
                </SwiperSlide>
            );
          })}
        </Swiper>
        <br />
        <br />
        <br />
        <div style={{fontSize: 20, fontWeight: 600}}>Vocabulary</div>
        <div style={{width: "100%", display: "flex", alignItems: "center", flexWrap: "wrap"}}>
          {
            data?.map((e, key)=> 
             <div key={key} style={{width: "20%", padding: 10}}>
               <VideoCard2 
                title={e.course_title}
                thumbnail={API_URL + e.course_thumb_url}
                on={timeSince(new Date(Date.parse(e.time_created) - aDay))}
                channel={e.full_name}
                channelId={e.course_user_id_created}
                videoId={e.course_id}
              />
             </div>
            )
          }
        </div>
        <br />
        <br />
        <br />
        <div style={{fontSize: 20, fontWeight: 600}}>Grammar</div>
        <div style={{width: "100%", display: "flex", alignItems: "center", flexWrap: "wrap"}}>
          {
            data1?.map((e, key)=> 
             <div key={key} style={{width: "20%", padding: 10}}>
               <VideoCard2 
                title={e.course_title}
                thumbnail={API_URL + e.course_thumb_url}
                on={timeSince(new Date(Date.parse(e.time_created) - aDay))}
                channel={e.full_name}
                channelId={e.course_user_id_created}
                videoId={e.course_id}
              />
             </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Feed;

function VideoCard(props) {
  const pageRoute = useNavigate();
  return (
    <div
      style={{ width: props.width, display: props.display }}
      className="w-[100%] sm:w-[90%] md:w-[100%] relative cursor-pointer videoComponent"
    >
      <img
        alt={""}
        onClick={() => pageRoute(`/watch/${props.videoId}`)}
        className="md:w-56 lg:w-72 rounded-[12px] videoImage"
        src={props.thumbnail}
        style={{ aspectRatio: 9 / 16 }}
      />
      <div
        style={{ width: props.rightWidth }}
        className="flex w-[100%] gap-x-3 items-start mt-2"
      >
        <div>
          <h3
            onClick={() => pageRoute(`/watch/${props.videoId}`)}
            className="text-[14px] lg:text-[16px] font-semibold leading-[20px] w-[94%]"
          >
            {props.title?.slice(0, 60)}
          </h3>
          <div className="mt-1">
            <p
              onClick={() => pageRoute(`/channel/${props.channelId}`)}
              style={{
                padding: 10,
                background: "#f2f0f5",
                borderRadius: 10,
                margin: "12px 0",
              }}
              className="text-[11.5px] text-[#606060] lg:text-[13.5px] font-[500] tracking-wide"
            >
              {props.channel}
            </p>
            <p
              onClick={() => pageRoute(`/watch/${props.videoId}`)}
              className="text-[11.5px] text-[#606060] lg:text-[13.5px] font-medium tracking-wider -mt-1"
            >
              {props.on}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoCard2(props) {
  const pageRoute = useNavigate()
  return (
    <div style={{ width: props.width, display: props.display }} className='w-[100%] sm:w-[90%] md:w-[100%] relative cursor-pointer videoComponent'>
      <img alt={""} style={{ aspectRatio: 9 / 16 }} onClick={() => pageRoute(`/watch/${props.videoId}`)} className='md:w-56 lg:w-72 rounded-[12px] videoImage' src={props.thumbnail} />
      <div style={{ width: props.rightWidth }} className='flex w-[100%] gap-x-3 items-start mt-2'><div>
        <h3 onClick={() => pageRoute(`/watch/${props.videoId}`)} className='text-[14px] lg:text-[16px] font-semibold leading-[20px] w-[94%]'>
          {props.title?.slice(0, 60)}
        </h3>
        <div className='mt-1'>
          <p style={{
            padding: 10,
            background: "#f2f0f5",
            borderRadius: 10,
            margin: "12px 0",
              }} onClick={() => pageRoute(`/channel/${props.channelId}`)} className='text-[11.5px] text-[#606060] lg:text-[13.5px] font-[500] tracking-wide'>{props.channel}</p>
          <p onClick={() => pageRoute(`/watch/${props.videoId}`)} className='text-[11.5px] text-[#606060] lg:text-[13.5px] font-medium tracking-wider -mt-1'>{props.on}</p>
        </div>
      </div>
      </div>
    </div>
  )
}

