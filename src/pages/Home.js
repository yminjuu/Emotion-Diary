import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import DiaryList from "../components/DiaryList";

import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

const Home = () => {
  //일기 리스트 관리------
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);
  const [monthlyReview, setMonthlyReview] = useState("");
  const [monthlyComment, setMonthlyComment] = useState("");

  //날짜 관리 (월, 년)------
  const [curDate, setCurDate] = useState(new Date()); //기본값: 현재 시간

  const onIncrease = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const onDecrease = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  const reviewEmotion = (diaryList) => {
    let count = 0;
    diaryList.map((it) => {
      if (it.emotion <= 3) count++;
    });

    let emotionRatio = count / diaryList.length;
    if (emotionRatio >= 0.7) {
      setMonthlyReview(" 기분 좋은");
      setMonthlyComment("이대로만 행복하세요! 🥰");
    } else if (emotionRatio >= 0.5) {
      setMonthlyReview(" 그럭저럭한");
      setMonthlyComment("조금 더 긍정적으로 생각해봐요! 💪");
    } else {
      setMonthlyReview(" 조금은 힘든 ");
      setMonthlyComment("이젠 좋은 일이 생길 거예요! 🍀");
    }
  };

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  //날짜에 따른 데이터 관리
  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date < lastDay)
      );

      reviewEmotion(diaryList);
    } else {
      setMonthlyReview("");
      setMonthlyComment("일기를 써볼까요? ✍️");
    }
  }, [diaryList, curDate]);

  useEffect(() => {}, [data]);

  return (
    <div>
      <MyHeader
        leftChild={<MyButton text={"<"} onClick={onDecrease}></MyButton>}
        headText={headText}
        rightChild={<MyButton onClick={onIncrease} text={">"}></MyButton>}
      ></MyHeader>
      <DiaryList diaryList={data}></DiaryList>
      <div className="monthlyEmotion">
        <h3>
          <span className="monthlyEmotionComment">
            {monthlyReview}
            {curDate.getMonth() + 1 + "월"}
            이네요
          </span>
        </h3>
        <div className="monthReview">{monthlyComment}</div>
      </div>
    </div>
  );
};

export default Home;
