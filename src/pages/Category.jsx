import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import get_course from "../api/get_course";
import { VideoCard2 } from "./Feed";
import { API_URL } from "../config";
import timeSince from "../utils/date";
import { useSelector } from "react-redux";

const Category = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  var aDay = 24 * 60 * 60 * 1000;
  useEffect(() => {
    (async () => {
      const result = await get_course();
      setData(
        result?.data?.filter(
          (item) => parseInt(item.course_category) === parseInt(id)
        )
      );
    })();
  }, [id]);
  const { sidebarExtend } = useSelector((state) => state.category);

  return (
    <>
      <div
        className={`sm:hidden overlayEffect ${
          sidebarExtend ? "block" : "hidden"
        }`}
      ></div>
      <div
        style={{
        marginLeft: 140,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {data?.map((e, key) => (
          <div key={key} style={{ width: "20%", padding: 10 }}>
            <VideoCard2
              title={e.course_title}
              thumbnail={API_URL + e.course_thumb_url}
              on={timeSince(new Date(Date.parse(e.time_created) - aDay))}
              channel={e.full_name}
              channelId={e.course_user_id_created}
              videoId={e.course_id}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
