import { Navigate, useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import React from "react";
import { emotionList } from "../util/emotion";

const DiaryItem = ({ id, emotion, content, date }) => {
  console.log(emotionList[emotion - 1].emotion_img);
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
        onClick={goDetail}
      >
        <img src={emotionList[emotion - 1].emotion_img}></img>
      </div>

      <div className="info_wrapper" onClick={goDetail}>
        <div className="diary_date">{new Date(date).toLocaleDateString()}</div>
        <div className="diary_content_preview">{content}</div>
      </div>

      <div className="btn_wrapper" onClick={goEdit}>
        <MyButton
          text={"수정하기"}
          type={"default"}
          onClick={() => {
            navigate(`/edit/${id}`);
          }}
        ></MyButton>
      </div>
    </div>
  );
};
export default React.memo(DiaryItem);
