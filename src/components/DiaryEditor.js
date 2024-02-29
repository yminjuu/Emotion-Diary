import { useCallback, useContext, useRef, useState } from "react";
import MyButton from "./MyButton";
import { DiaryDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";
import { emotionList } from "../util/emotion";
import React from "react";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

//props로 받는 것: 수정하기를 누른 경우에 대비하여 originData를 받아와 띄운다.
const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  //날짜 선택 관리
  const [date, setDate] = useState(
    isEdit
      ? new Date(originData.date).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10)
  );

  //감정 선택 관리
  const [emotion, setEmotion] = useState(isEdit ? originData.emotion : 3);

  const handleClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  //본문 작성 관리
  const [content, setContent] = useState(isEdit ? originData.content : "");

  const contentInput = useRef();

  //1. 수정 완료 관리
  const onEdit = useContext(DiaryDispatchContext).onEdit; //App.js에서 ContextProvider에서 뿌린 함수를 받아옴

  const handleSubmit = () => {
    if (window.confirm("일기를 수정하시겠습니까?")) {
      onEdit(originData.id, date, content, emotion);
      navigate("/", { replace: true });
    }
  };

  //2. 새 일기 작성에서 일기를 추가할 때
  const onCreate = useContext(DiaryDispatchContext).onCreate; //context로부터 onCreate 함수를 받아옴

  //새로운 일기 추가 관리
  const AddNewDiary = () => {
    if (content.length < 1) {
      contentInput.current.focus();
      return;
    }
    if (window.confirm("새로운 일기를 작성하시겠습니까?")) {
      const newDate = new Date(date).getTime();
      onCreate({ emotion, content, date: newDate });
      setDate(new Date().toISOString().slice(0, 10));
      setEmotion(3);
      setContent("");
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="DiaryEditor">
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></input>
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                onClick={handleClickEmotion}
                key={it.emotion_id}
                {...it}
                isSelected={it.emotion_id === emotion}
              ></EmotionItem>
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              ref={contentInput}
              placeholder="오늘은 어땠남"
              value={content}
              onChange={(e) => {
                contentInput.current.focus();
                setContent(e.target.value);
              }}
            ></textarea>
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton
              text={"취소하기"}
              type={"default"}
              onClick={() => {
                navigate(-1);
              }}
            ></MyButton>
            <MyButton
              text={"작성 완료"}
              type={"positive"}
              onClick={isEdit ? handleSubmit : AddNewDiary}
            ></MyButton>
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);
