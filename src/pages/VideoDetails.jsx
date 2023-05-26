import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getVideoDetails, getRelatedVideos } from "../redux/videoSlice";
import ReactPlayer from "react-player";
import { FiThumbsUp } from "react-icons/fi";
// import timeSince from "../utils/date";
import convertToInternationalCurrencySystem from "../utils/convert";
import get_course_detail from "../api/get_course_detail";
import { API_URL } from "../config";
import get_like_course from "../api/get_like_course";
import get_comment_course from "../api/get_comment_course";
import get_view_course from "../api/get_view_course";
import CommentComponent from "../components/CommentComponent";
import axios from "axios";
import Cookies from "js-cookie";
import LinesEllipsis from "react-lines-ellipsis";

function VideoDetails() {
  const { sidebarExtend } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const { id } = useParams();
  const pageRoute = useNavigate();
  useEffect(() => {
    dispatch(getVideoDetails(`videos?part=snippet,statistics&id=${id}`));
    dispatch(
      getRelatedVideos(`search?part=snippet&relatedToVideoId=${id}&type=video`)
    );
  }, [id]);
  const [data, setData] = useState();
  const [likeCourse, setLikeCourse] = useState([]);
  const [commentCourse, setCommentCourse] = useState([]);
  const [viewCourse, setViewCourse] = useState([]);
  const [like, setLike] = useState(false);
  const [countLike, setCountLike] = useState();

  useEffect(() => {
    (async () => {
      const result = await get_course_detail(id);
      const result1 = await get_like_course(id);
      const result2 = await get_comment_course(id);
      const result3 = await get_view_course(id);
      setData(result);
      setLikeCourse(result1);
      setCommentCourse(result2);
      setViewCourse(result3);
      setCountLike(result1?.data?.length);
      setLike(
        result1?.data?.filter((item) => item.user_id_post == Cookies.get("uid"))
          ?.length > 0
          ? true
          : false
      );
    })();
  }, [id]);
  const [relatedVideo, setRelatedVideo] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios({
        url: API_URL + "/api/v1/video/related",
        method: "get",
      });
      const result = await res.data;
      setRelatedVideo(result?.data);
      return result;
    })();
  }, []);

  const likeFunction = async () => {
    const res = await axios({
      url: API_URL + "/api/v1/course/like",
      method: "post",
      headers: {
        Authorization: "Bearer " + Cookies.get("accessToken"),
      },
      data: {
        course_id: id,
      },
    });
    const result = await res.data;
    if (result.like === true) {
      setLike(true);
      setCountLike(parseInt(countLike) + 1);
    } else {
      setLike(false);
      setCountLike(parseInt(countLike) - 1);
    }
    return result;
  };
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const res = await axios({
        url: API_URL + "/api/v1/course/view",
        method: "post",
        data: {
          course_id: id,
        },
      });
      const result = await res.data;
      return result;
    }, 10000);
    return () => clearInterval(timeoutId);
  }, [id]);
  return (
    <>
      <div
        className={`sm:hidden overlayEffect ${
          sidebarExtend ? "block" : "hidden"
        }`}
      ></div>

      <div
        className={`pl-0  ${
          sidebarExtend ? "sm:pl-[180px]" : "sm:pl-[70px]"
        } pt-20 ml-4 lg:flex lg:gap-x-7`}
      >
        <div className="w-[96%] lg:max-w-[850px] h-[240px] sm:h-[320px] lg:h-[430px] container">
          <ReactPlayer
            playing={true}
            width="100%"
            height="100%"
            className="react-player"
            url={`${API_URL}${data?.data?.course_video_url}`}
            controls
          />
          <div>
            <div className="flex gap-x-1"></div>
            <h2 className="text-md sm:text-xl md:text-2xl text-[#000000] font-medium mt-3">
              {data?.data?.course_title || "_"}
            </h2>
            <div className="sm:flex items-center justify-between mt-3 space-y-3">
              {/* <img className='rounded-[20px]' src="https://yt3.ggpht.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s48-c-k-c0x00ffffff-no-rj" /> */}
              {/* <div className='flex flex-col -gap-y-6'> */}

              <h5
                onClick={() =>
                  pageRoute(`/channel/${data?.data?.course_user_id_created}`)
                }
                className="w-fit text-sm sm:text-md font-medium text-[#000000] px-3 py-2 rounded-[10px] bg-[#f2f2f2] tracking-wide"
              >
                {data?.data?.full_name || "_"}
              </h5>

              {/* </div> */}

              <div className="flex items-center gap-x-3 mb-5 sm:mb-0">
                <div
                  onClick={likeFunction}
                  style={{
                    background: like === true ? "#2e89ff" : "#f2f0f5",
                    color: like === true ? "#fff" : "#000",
                    cursor: "pointer",
                  }}
                  className="flex items-center bg-[#f2f2f2] px-3 py-2 rounded-[10px]"
                >
                  <FiThumbsUp className="w-10 h-6" />
                  <span
                    style={{
                      color: like === true ? "#fff" : "#000",
                      marginRight: 8,
                    }}
                    className="text-[12.4px] sm:text-[14.4px] text-[#0f0f0f] font-medium tracking-wide"
                  >
                    {convertToInternationalCurrencySystem(countLike || "0")}
                    Likes
                  </span>
                </div>
                <span className="text-[12.4px] sm:text-[14.4px] text-[#0f0f0f] font-medium tracking-wide bg-[#f2f2f2] px-3 py-2 rounded-[10px]">
                  {convertToInternationalCurrencySystem(
                    viewCourse?.data?.length || "0"
                  ) + " Views"}
                </span>
              </div>
            </div>
            {/* Desc */}
            <LinesEllipsis
              text={data?.data?.course_description}
              maxLine="3"
              ellipsis="..."
              trimRight
            />

            {/*  */}
            <CommentComponent />
          </div>
        </div>
        <div className="flex flex-col gap-y-4 mt-48 sm:mt-40 lg:mt-0">
          {/* {relatedVideo?.map((e, index) => {
            return (
              <Video
                key={index + 2}
                width="210px"
                title={e.course_title}
                thumbnail={API_URL + e.course_thumb_url}
                on={timeSince(new Date(Date.parse(e.time_created) - aDay))}
                channel={e.full_name}
                channelId={e.course_user_id_created}
                videoId={e.course_id}
              />
            );
          })} */}
        </div>
      </div>
    </>
  );
}

export default VideoDetails;
